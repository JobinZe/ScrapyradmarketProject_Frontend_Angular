
const paymentSchema = require('../models/payment-model');
const cartSchema = require('../models/cart-model');
const checkoutSchema = require('../models/checkout-model');

exports.paymentDetailController = async(req,res)=> {
  const userId = req.user.userId;
  const payload = req.body;
  if (!userId) {
    res.status(500).json({message: "User not found"});
  }
  try {
    const orderId = 'ORDER' + Math.random().toString(36).substring(2,9).toUpperCase()
    const recievedPayload = new paymentSchema({
      userId: userId,
      fullName: payload.fullName,
      emailAddress: payload.emailAddress,
      streetAddress: payload.streetAddress,
      city: payload.city,
      zipCode: payload.zipCode,
      paymentMethod: payload.paymentMethod,
      cardHolder: payload.cardHolder,
      cardNumber: payload.cardNumber,
      expiryDate: payload.expiryDate,
      cvv: payload.cvv,
      paymentStatus: true,
      date:Date.now(),
      orderId:orderId
    })
    await recievedPayload.save();
   await cartSchema.deleteMany({userId: userId});
    return res.status(200).json({status: 1024, message: "Payment successfull"});
  }
  catch(err){
    console.log(err);
    return res.status(500).json({message:err});
  }
}
exports.getPaymentDetail = async (req,res)=>{
const userId = req.user.userId;
try{
  const fetchPaymentDetails = await paymentSchema.findOne({userId:userId});
  const checkoutDetail = await checkoutSchema.findOne({userId: userId})
  const obj = {
    orderId:fetchPaymentDetails.orderId,
    date:fetchPaymentDetails.date,
    totalAmount:checkoutDetail.totalAmount,
    paymentType:fetchPaymentDetails.paymentMethod
  }
  console.log(obj,"obj>>>")
  if(fetchPaymentDetails){
    return res.status(200).json({status:1025,message:"Payment fetched successfully",obj})
  }
}
catch(err){
  console.log(err);
  return res.status(500).json({message:err})
}
}



