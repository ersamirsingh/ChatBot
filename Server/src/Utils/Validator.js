import validator from 'validator'


const ValidateData = (data) => {

   try {
      
      const {emailId, password} = data

      if(!validator.isEmail(emailId)){
         return{
            success: false,
            message: 'Invalid email'
         }
      }

      if(!validator.isStrongPassword(password)){
         return {
            success: false,
            message: 'Weak password'
         }
      }

      return{
         success: true,
      }
   } catch (error) {
      return {
         success: false,
         message: 'Something went wrong'
      }
   }
}

export default ValidateData