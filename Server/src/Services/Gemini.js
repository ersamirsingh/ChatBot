import {GoogleGenAI} from '@google/genai'


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });


const Gemini = async(req, res) =>{

   try {

      const {prompt} = req.body || {}
      if(!prompt)
         return res.status(400).json({message: 'Prompt not found'})

      const response = await ai.models.generateContent({
         model: "gemini-2.5-flash",
         contents: prompt,
      });

      return res.json(response);
   } catch (error) {
      return res.status(500).json({message: error.message})
   }
}




export default Gemini;