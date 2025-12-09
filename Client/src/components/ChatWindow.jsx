import { useState } from "react";
import { api } from "../api/client";
export function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await api.post("/chat", { message: input });
      const botMessage = { role: "assistant", content: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
    }
    setInput("");
  };

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
