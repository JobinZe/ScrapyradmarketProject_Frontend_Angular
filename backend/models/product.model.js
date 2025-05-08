const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose)

const productSchema=new mongoose.Schema({
    productName:{type:String,require:true},
    price:{type:Number,required:true},
    categoryValues:{type:Number,required:true,ref:"Categories"},
    description:{type:String,required:true},
    image:{type:String,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
})
productSchema.plugin(AutoIncrement,{inc_field:'productId'})
const Product = mongoose.model("Products",productSchema)
module.exports=Product