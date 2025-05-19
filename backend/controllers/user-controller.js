const jwt = require('jsonwebtoken');
const userSchemaModel = require('../models/user.model')
const bcrypt = require('bcryptjs'); // You forgot to include bcrypt
exports.resetPassword = async(req,res)=>{
const {token} = req.params;
const {newPassword,confirmPassword} = req.body;
if(!newPassword || !confirmPassword){
  return res.status(500).json({message:"Please enter both passwords"});
}
if(newPassword != confirmPassword){
  return res.status(200).json({status:1026,message:"Incorrect password"})
}
try{
  console.log(token,"token")
const decodedToken = jwt.verify(token, process.env.RESET_PASS,{
  expiresIn:'15m'
});

const userId = decodedToken.userId;
const hashedPassword = await bcrypt.hash(newPassword,10);
await userSchemaModel.findByIdAndUpdate(userId,
  {password:hashedPassword},
  {new:true}
)
  return res.status(200).json({status:1027,message:"Reset password successfull"})
}
catch(err){
console.log(err)
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({status:1028, message: 'Reset link expired. Please request a new one.' });
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(400).json({status:1029, message: 'Invalid or malformed token' });
  }
  return res.status(500).json({message:"Server Error"})
}
}
