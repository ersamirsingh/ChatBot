import express from 'express'
const chatRouter = express.Router()
import authenticateUser from '../Middleware/authenticateUser.js'
import Gemini from '../Services/Gemini.js'



// chatRouter.get('/',  authenticateUser, Gemini)

chatRouter.post('/', Gemini)

export default chatRouter