const express = require('express');
const router = express.Router();
const Cart = require('../models/cart-model');
const verifyToken = require('../middlewares/tokenverification');
const Product = require("../models/product.model");

router.post('/add-to-cart/:id',verifyToken,async(req,res)=>{
  const id= req.params.id;
  const userId = req.user.userId;
  if(!id){
    res.status(500).json({message:"Failed to fetch cart details"});
  }
  const fetchProduct = await Product.findById(id)
  const cart = new Cart({
    userId:userId,
    productName:fetchProduct.productName,
    price:fetchProduct.price,
    categoryValues:fetchProduct.categoryValues,
    description:fetchProduct.description,
    image:`${req.protocol}://${req.get('host')}/upload/${fetchProduct.image}`,
    addedToCart:true
  });
  await cart.save()
  res.status(200).json({message:"Product Added to cart",status:1014})
})
 router.get('/get-cart-details',verifyToken,async(req,res)=>{
   const userId = req.user.userId;
   console.log(userId,"user id");
   const cartItems = await Cart.find({userId:userId});
   console.log(cartItems,"cart items");
   if(!cartItems || cartItems.length == 0){
     return res.status(200).json({status: 1015,message:"No cart found"});
   }
   return res.status(200).json({cartItems})
 })
module.exports = router

