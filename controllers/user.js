import { User } from "../Models/User.js";
import bcrypt from 'bcryptjs'; //For making password secure . Making hash
import jwt from 'jsonwebtoken'; 
/*jsonwebtoken (or JWT) is used to keep users logged in safely.

💡 How it works:

When a user logs in, the server creates a token (like a digital pass).

The server gives that token to the user.

Every time the user visits a protected page, they send the token.

The server checks the token to make sure it’s real and not expired.

If the token is valid → ✅ access is allowed
If not → ❌ access denied */


//For Registration
export const register = async (req, res)=>{
  const {name,gmail,password} = req.body
  try {
    let user = await User.findOne({gmail})

    if(user) return res.json({message: "User is already exists..."});

    //Make password hash 
    const hashPassword = await bcrypt.hash(password,10);

    user = await User.create({name, gmail, password:hashPassword})
    res.json({message: "User Registration Succesfully..!"})

  } catch (error) {
    res.json({message: error.message})
  }
  console.log(req.body)
}


//For Login
export const login = async (req, res) => {
  const {name,gmail, password} = req.body;

  try {
    let user = await User.findOne({gmail});
    if(!user) return res.json({message:"User not exist"});

    const validPass = await bcrypt.compare(password, user.password);

    if(!validPass) return res.json({message: "Invalid Credentials.."});

    const token = jwt.sign({userId:user._id},"!@#$%^&*()",{
      expiresIn:'1d'
    }) 

    res.json({message: `Welcome ${user.name}`, token})

  } catch (error) {
    res.json({message: error.message})
  }
}


//For user profile
export const profile = async (req, res) => {
  res.json({user: req.user})
}