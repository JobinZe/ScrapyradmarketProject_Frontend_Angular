const mongoose = require('mongoose');
const {Mongoose} = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose)

const productSchema=new mongoose.Schema({
    productName:{type:String,require:true},
    price:{type:Number,required:true},
    categoryValues:{type:Number,required:true,ref:"Categories"},
    description:{type:String,required:true},
    quantity:{type:Number,required:true},
    image:{type:String,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    addedToCart:{type:Boolean,required:true},
    quantityAvailable:{type:Boolean,default:true},
    imageName:{type:String,required:true},
})
productSchema.plugin(AutoIncrement,{inc_field:'productId'})
const Product = mongoose.model("Products",productSchema)
module.exports=Product
