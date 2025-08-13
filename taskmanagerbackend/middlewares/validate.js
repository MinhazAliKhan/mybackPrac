const {validationResult}=require('express-validator');
const { model } = require('mongoose');
 const validate=(req,res,next)=>{
    const error=validationResult(req);
    if (!error.isEmpty()){
        return res.status(400).json({
            success:false, 
            error:error.array().map((err)=>({
                field:err.path,
                message:err.msg
            }))
        })
    }
    next();
}

module.exports={validate}