import express from 'express';
import { profile, register } from '../controllers/user.js';
import { login } from '../controllers/user.js';
import { Authenticate } from '../middlewares/auth.js';
const router = express.Router();

//User Register
router.post('/register',register)
//Post api ko controller folder me daal diya waha saare functions honge . yaha sirf route manage hoga


//User Login
router.post('/login',login)

//Profile
router.get("/user", Authenticate, profile)



export default router