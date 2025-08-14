const User = require('../model/User');
const jwt=require('jsonwebtoken');
const registerUser=async (req,res,next)=>{
    try {
        const {name,email,password}=req.body;
        if (!name||!email||!password){
            return res.status(400).json({
                message:"please enter all fields"
            })
            
        }
        const userExist=await User.findOne({email});
        if (userExist){
            return res.status(400).json({
                message:"User Already exist"
            })
            
        }
        const user=new User({name,email,password});
            await user.save();
            res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const loginUser=async(req,res,next)=>{
    try {
        const{email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({
                message:"please enter all fields"
            })
        }
        const user=await User.findOne({email});
        if (!user){
            return res.status(400).json({
                message:"User Not Found"
        })  
        }
        const isMatch=await user.comparePassword(password);
        if (!isMatch){
            return res.status(400).json({
                message:"invalid credentials"
            })
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        return res.status(200).json({
                message:"login successfully",
                token:token
            })
    }
     catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}
module.exports={registerUser,loginUser}