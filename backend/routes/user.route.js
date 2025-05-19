const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const verifyToken = require('../middlewares/tokenverification');
const userController = require('../controllers/user-controller')
// Register API Route
router.post('/register', async (req, res) => {
  console.log("Entered Register API");

  const { userName,email,gender,type, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({userName:userName})
    const existingEmail = await UserModel.findOne({email:email})

    console.log(existingUser,"exc")
      if(existingUser || existingEmail){
        return res.status(200).json({
          status:1006,
          message:"Already registered"
        })
      }
      const hashedPwd = await bcrypt.hash(password, 10); //  Fixed `await`
      const newUser = new UserModel({ userName, email,gender, type, password: hashedPwd });
      await newUser.save();
      res.status(200).json({ message: "User created successfully",status:1000 });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to register user" });
  }
});

router.post('/login',async(req,res)=>{
  const {username,password}=req.body;
  const userName=username
  try{
    const user = await UserModel.findOne({userName});
    console.log(user,"user found")
    if(!user){
     return res.status(200).json({status : 1008,statusMessage:"User Not Found"})
    }
   const isMatch = await bcrypt.compare(password,user.password);
   if(!isMatch){
    return res.status(200).json({status : 1009, Message : "Invalid Password"})
   }
   const token = jwt.sign({userId:user._id,username:user.userName},process.env.SECRET_KEY,{
    expiresIn:'1h'
   })
   return res.status(200).json({message:"Log In Success",status:1001,isLoggedIn:true,token,type:user.type})
  }
  catch(err){
   console.log(err,"Log In Failed")
  }
})

router.get('/logout',(req,res)=>{
  try{
    return res.status(200).json({message:"Log Out Successful",status:1006,isLoggedIn:false})
  }
  catch(err){
    console.log(err)
    return res.status(500).json({message:"Log Out Failed",status:1007})
  }
})
router.post('/forgot-password',async(req,res)=>{
  const {email} = req.body;
  try{
  const user = await UserModel.findOne({email});

  if(!user){
    return res.status(200).json({message:"User is not present",status:1003})
  }
  const token = jwt.sign({userId:user._id,},process.env.SECRET_KEY,{
    expiresIn:'15m'
  })

  const transpotter=nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,               // SSL port
    secure: true,
    auth:{
      user:process.env.EMAIL_USER,
      pass:process.env.EMAIL_PASS
    }
  })

  const resetLink=`http://localhost:4200/common/reset-password/${token}`;
  const mailOptions={
    from:process.env.EMAIL_USER,
    to:email,
    subject:'Password Reset Request',
    html:`<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 15 minutes.</p>`
  }
  await transpotter.sendMail(mailOptions);
  res.status(200).json({message:"Done",status:1004})
}
catch(err){
  console.log(err,"err")
  res.status(500).json({message:"Error in api",status:1005})
}
})

router.post('/authorization',verifyToken,(req,res)=>{
  res.status(200).json({message:"Valid Token"})
})
router.post('/reset-password/:token',userController.resetPassword)
module.exports = router;
