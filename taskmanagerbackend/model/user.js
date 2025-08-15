const mongoose=require('mongoose');
const bcrypt =require("bcryptjs");
 const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: { type: String, enum: ["user", "admin"], default: "user" }
  
 },
{ timestamps: true })

 userSchema.pre('save',async function(next){
if (!this.isModified('password')) return(next);
this.password= await bcrypt.hash(this.password,10)
next();
 })
userSchema.methods.comparePassword=async function(enteredPassword){
return await bcrypt.compare(enteredPassword,this.password)
};
//  Hide password in JSON and That’s a Mongoose schema method that changes how a document is converted to JSON when sending it in a response.
// So whenever you do:res.json(user)The password will automatically be excluded.
// You don’t need this if you prefer to use .select("-password") in your queries instead.
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model('User', userSchema);
module.exports =User