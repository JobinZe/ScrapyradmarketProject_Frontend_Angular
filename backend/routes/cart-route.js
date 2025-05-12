const express = require('express');
const router = express.Router();
const Cart = require('../models/cart-model');
const verifyToken = require('../middlewares/tokenverification');
const Product = require("../models/product.model");
const mongoose = require("mongoose");

router.post('/add-to-cart/:id',verifyToken,async(req,res)=>{
  const id= req.params.id;
  const userId = req.user.userId;
  const selectedQuantity = req.body;
  if(!id){
    res.status(500).json({message:"Failed to fetch cart details"});
  }
  let fetchProduct = await Product.findById(id)
  if(selectedQuantity.quantity > fetchProduct.quantity){
    res.status(200).json({status:1016,message:"No enough quantity"});
  }
  fetchProduct.quantity-=selectedQuantity.quantity;
  if(fetchProduct.quantity === 0){
    fetchProduct.quantityAvailable = false;
  }
  await fetchProduct.save();
   let existingCart = await Cart.findOne({userId: userId,_id:id});
  let cart;
  if(!existingCart){
     cart = new Cart({
      userId:userId,
      productName:fetchProduct.productName,
      price:fetchProduct.price,
      categoryValues:fetchProduct.categoryValues,
      description:fetchProduct.description,
      quantity:selectedQuantity.quantity,
       productId:fetchProduct.productId,
      image:`${req.protocol}://${req.get('host')}/upload/${fetchProduct.image}`,
      addedToCart:true
    });
  }
  else{
    existingCart.quantity+=selectedQuantity.quantity;
    cart = existingCart;
  }

  await cart.save()
  res.status(200).json({message:"Product Added to cart",status:1014})
})
 router.get('/get-cart-details',verifyToken,async(req,res)=>{
   const userId = req.user.userId;
   const cartItems = await Cart.find({userId:userId});
   if(!cartItems || cartItems.length == 0){
     return res.status(200).json({status: 1015,message:"No cart found"});
   }
   return res.status(200).json({status:1016,cartItems})
 })
router.post('/remove-cart-items/:id',verifyToken,async(req,res)=>{
  const userId = req.user.userId;
  const objectId = req.params.id;
  const removeQuantity = req.body;

  const fetchCartItemToRemove = await Cart.findOne({userId: userId,_id:objectId});
  if(!fetchCartItemToRemove){
    return res.status(200).json({status:1018,message:"No cart items found"});
  }
  console.log(fetchCartItemToRemove,removeQuantity.quantity, fetchCartItemToRemove.quantity,fetchCartItemToRemove.quantity === removeQuantity.quantity,">>>>")
  if(removeQuantity.quantity < fetchCartItemToRemove.quantity){
    fetchCartItemToRemove.quantity -= removeQuantity.quantity;
    await fetchCartItemToRemove.save()
  }
  else if(fetchCartItemToRemove.quantity === removeQuantity.quantity){
    console.log("entered deletion")
    await fetchCartItemToRemove.deleteOne()
  }
  const productId = fetchCartItemToRemove.productId;
  const productToUpdate = await Product.findOne({userId: userId,productId:productId})
  if(!productToUpdate){
   const reAddProduct = new Product({
     productName:fetchCartItemToRemove.productName,
     price:fetchCartItemToRemove.price,
     categoryValues:fetchCartItemToRemove.categoryValues,
     description:fetchCartItemToRemove.description,
     quantity:fetchCartItemToRemove.quantity,
     image:fetchCartItemToRemove.image,
     userId:fetchCartItemToRemove.userId,
     addedToCart:fetchCartItemToRemove.addedToCart,
     quantityAvailable:true,
   })
    await reAddProduct.save()
  }
  else{
    productToUpdate.quantity += removeQuantity.quantity;
    productToUpdate.quantityAvailable = true
    await productToUpdate.save()
  }
  return res.status(200).json({status:1020,message:"Product Added back to dashboard"});
})
module.exports = router

