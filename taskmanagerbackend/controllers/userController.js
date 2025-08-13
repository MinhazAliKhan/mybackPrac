const User = require('../model/User');
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
module.exports={registerUser}