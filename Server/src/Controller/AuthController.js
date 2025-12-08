import jwt from 'jsonwebtoken';
import User from '../Models/User.js';
import ValidateData from '../Utils/Validator.js';
import bcrypt from 'bcrypt';




const cookieOptions = {
   httpOnly: true,
   secure: process.env.NODE_ENV === 'production' ? true : false,
   sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
   maxAge: parseInt(process.env.JWT_MAX_AGE)
};



const Register = async (req, res) => {

  try {

    const { emailId, password, firstName } = req.body;
    if (!emailId || !password || !firstName) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const result = ValidateData(req.body);
    if (!result.success)
      return res.status(400).json({
        success: false,
        message: result.message,
      });

    let user = await User.findOne({ emailId });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User already exist',
      });
    }


    const newPass = await bcrypt.hash(password, 10);
    req.body.password = newPass


    user = await User.create(req.body);
    const token = jwt.sign(
      {_id: user._id, emailId: user.emailId, role: user.role}, 
      process.env.SECRET_KEY, 
      {expiresIn: process.env.JWT_EXP,}
    );
    res.cookie('Token', token, cookieOptions);


    res.status(201).json({
      success: true,
      user:{
        firstName: user?.firstName,
        lastName: user?.lastName,
        emailId: user?.emailId,
        pics: user?.pics,
        role: user?.role,
        contact: user?.contact,
        _id: user?._id,
        createdAt: user?.createdAt,
        updatedAt: user?.updatedAt,
      },
      message: 'User registered successfully',
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};




const Login = async (req, res)=>{

  try {
    
    console.log('first');
    
    const {emailId, password} = req.body;
    if(!emailId || !password){
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      })
    }

    const user = await User.findOne({emailId});
    if(!user){
      return res.status(400).json({
        success: false,
        message: 'User does not exist'
      })
    }

    const isMatched = await bcrypt.compare(password, user?.password);
    if(!isMatched){
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    const token = jwt.sign(
      {_id: user._id, emailId: user.emailId, role: user.role}, 
      process.env.SECRET_KEY, 
      {expiresIn: process.env.JWT_EXP,}
    );
    res.cookie('Token', token, cookieOptions);

    res.status(200).json({
      success: true,
      user:{
        firstName: user?.firstName,
        lastName: user?.lastName,
        emailId: user?.emailId,
        pics: user?.pics,
        role: user?.role,
        contact: user?.contact,
        _id: user?._id,
        createdAt: user?.createdAt,
        updatedAt: user?.updatedAt,
      },
      message: 'User logged in successfully'
    })
  } 
  catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }  
    
}



export { Register, Login };
