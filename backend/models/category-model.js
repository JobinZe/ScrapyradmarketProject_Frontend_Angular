const mongoose=require('mongoose');
const {Mongoose} = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose)

const categorySchema = new mongoose.Schema({
    _id: { type: Number },
    category:{type:String,required:true,unique:true},
    userId: {type:mongoose.Schema.Types.ObjectId,unique:true,ref:"User"},
})
categorySchema.plugin(AutoIncrement,{inc_field:'_id'})
const category = mongoose.model("Categories",categorySchema)
module.exports=category
