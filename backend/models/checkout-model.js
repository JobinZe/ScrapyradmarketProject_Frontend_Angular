const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const checkoutSchema = new mongoose.Schema({
  orderId:{type:Number},
  subtotal:{type:Number,required: true},
  shipping:{type:Number,required: true},
  tax:{type:Number,required: true},
  totalAmount:{type:Number,required: true},
  userId:{type:mongoose.Schema.Types.ObjectId},
})
checkoutSchema.plugin(AutoIncrement,{inc_field:'orderId'});
const checkOutModel = mongoose.model('Checkout',checkoutSchema);
module.exports = checkOutModel;
