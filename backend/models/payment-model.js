const mongoose = require('mongoose');
const mongooseSequence = require('mongoose-sequence')(mongoose);
const paymentSchema = new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,required:true},
  paymentId:{type:Number,unique:true},
  fullName:{type:String,required:true},
  emailAddress:{type:String,required:true},
  streetAddress:{type:String,required:true},
  city:{type:String,required:true},
  zipCode:{type:Number,required:true},
  paymentMethod:{type:Number,required:true},
  cardHolder:{type:String,required:true},
  cardNumber:{type:Number,required:true},
  expiryDate:{type:String,required:true},
  cvv:{type:Number,required:true},
  paymentStatus:{type:Boolean,required:true,default:false},
  date:{type:Date,required:true},
  orderId:{type:String,required:true}
})
paymentSchema.plugin(mongooseSequence,{inc_field:'paymentId'})
const mongooseModel = mongoose.model("Payment_Details",paymentSchema)
module.exports=mongooseModel;
