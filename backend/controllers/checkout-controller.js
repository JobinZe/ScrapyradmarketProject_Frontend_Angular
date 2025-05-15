const checkoutModel = require('../models/checkout-model')
exports.checkout = async (req,res)=>{
  try{
    const userId = req.user.userId;
    const payload = req.body;
    if(!userId){
      return res.status(500).json({error:err,message:"User Not Authorized"})
    }
    const checkUserIdExist = await checkoutModel.exists({userId:userId})
    if(checkUserIdExist){
      const fetchExisistingData = await checkoutModel.findOne({userId:userId});
      const parsedPayload={
        subtotal:JSON.parse(payload.subtotal),
        shipping:JSON.parse(payload.shipping),
        tax:JSON.parse(payload.tax),
        totalAmount:JSON.parse(payload.totalAmount),
      }
      console.log(parsedPayload,"parsed data")
      Object.assign(fetchExisistingData,parsedPayload)
      await fetchExisistingData.save()
    }
    else{
      const checkoutSchema = new checkoutModel({
        subtotal:payload.subtotal,
        shipping:payload.shipping,
        tax:payload.tax,
        totalAmount:payload.totalAmount,
        userId: userId
      })
      await checkoutSchema.save();
      }
    res.status(200).json({status:1024,message:"Checkout successfully"})
  }
  catch(err){
    console.log(err)
    res.status(403).json({error:err})
  }
}
exports.getCheckout = async(req,res)=>{
  const userId =  req.user.userId;
  const fetchCheckout = await checkoutModel.findOne({userId:userId});
  if(!fetchCheckout){
    return res.status(200).json({status:1023,message:"Checkout not found"})
  }
  await res.status(200).json({status:1024,fetchCheckout})
}
