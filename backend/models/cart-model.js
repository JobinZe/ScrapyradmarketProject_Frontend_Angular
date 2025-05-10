const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose)
const cartSchema = new mongoose.Schema({
  productName:{type:String,require:true},
  price:{type:Number,required:true},
  categoryValues:{type:Number,required:true,ref:"Categories"},
  description:{type:String,required:true},
  image:{type:String,required:true},
  userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  addedToCart:{type:Boolean,required:true},
})
cartSchema.plugin(AutoIncrement,{inc_field:'cartProductId'});
const cart  = mongoose.model("Cart",cartSchema);
module.exports = cart;
