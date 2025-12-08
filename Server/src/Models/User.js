import mongoose from 'mongoose'


const userSchema = mongoose.Schema({

   firstName: {
      type: String, 
      required: true,
      minLength: 3,
      maxLength: 20
   },
   lastName:{
      type: String, 
      required: false,
      minLength: 3,
      maxLength: 20
   },
   emailId: {
      type: String, 
      required: true,
      unique: true,
   },
   contact:{
      type: Number,
      required: false,
   },
   password: {
      type: String, 
      required: true,
   },
   pic: {
      type: String, 
      default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
   },
   role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
   }
}, {timestamps: true})


const User = mongoose.model('user', userSchema)
export default User