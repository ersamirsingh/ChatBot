import { useState } from "react";
import axiosClient from "../API/AxiosClient";




export function ChatWindow() {

   const [messages, setMessages] = useState([]);
   const [input, setInput] = useState("");
   const [loading, setLoading] = useState(false)

   const sendMessage = async () => {
      
      if (!input.trim()) {
         window.alert("Please enter a message")
         return
      }
      const userMessage = { role: "user", content: input };
      setMessages((prev) => [...prev, userMessage]);

      try {
         setLoading(true)
         console.log('input', input)
         const res = await axiosClient.post("/chat", { prompt: input });
         // console.log(res)
         const botMessage = { role: "assistant", content: res?.data?.candidates[0]?.content?.parts[0]?.text};
         setMessages((prev) => [...prev, botMessage]);
      } catch (err) {
         window.alert(err || 'Something went wrong')
         console.error(err);
      }
      finally{
         setLoading(false)
      }
      setInput("");
   };


   if(loading){
      <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
         <span className="loading loading-dots loading-sm" />
         <span>Assistant is typing...</span>
      </div>
   }

   return (
      <div className="space-y-4">
         <div className="h-[70vh] overflow-y-auto border p-4 rounded">
         {messages.map((m, i) => (
            <div
               key={i}
                  className={`p-2 my-2 rounded max-w-xl ${
                  m.role === "user" ? "bg-blue-200 ml-auto" : "bg-gray-200"
               }`}
            >
               {m.content}
            </div>
         ))}
         </div>

         <div className="flex gap-2">
         <input
            type="text"
            className="flex-1 border p-2 rounded"
            value={input}
            onChange={(e) => setInput(e.target.value)}
         />
         <button className="p-2 bg-blue-600 text-white rounded" onClick={sendMessage}>
            Send
         </button>
         </div>
      </div>
   );
}
