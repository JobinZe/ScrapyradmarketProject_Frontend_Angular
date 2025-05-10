const express = require('express');
const router = express.Router();
const categoryModel=require('../models/category-model')
const upload = require('../middlewares/upload-document');
const Product = require('../models/product.model');
const verifyToken = require('../middlewares/tokenverification');

router.post('/add-categories',verifyToken,async(req,res)=>{
    try{
      const userId = req.user.userId
      const {category}= req.body
        if(!category){
            return res.status(400).json({message:"Category Not Recieved",status:1009})
        }
        const categoryValues={
          category:category,
          userId:userId
        }
        const schema = await new categoryModel({category,userId})
        await schema.save()
        res.status(200).json({message:"Category Aded Suceessfuly",status:1010})
    }
    catch(err){
        res.status(500).json({message:"Server Error"})
        console.log(err,"err")
    }
}
)
router.get('/get-category',verifyToken,async(req,res)=>{
    try{
      const userId = req.user.userId
      const data=await categoryModel.find({userId})
      res.status(200).json(data)
    }
    catch(err){
        console.log(err,"err")
        res.status(500).json({message:"Eroor in fetching category data"})
    }
})

router.post('/add-product',verifyToken,upload.single("image"),async(req,res)=>{//verifyToken to get tthe decoded token
  try{
   const {productName,price,categoryValues,description}  = req.body
   const userId=req.user.userId
   if(!productName || !price || !categoryValues || !description){
    res.status(500).json({message:"Failed to add Product"})
   }
   const product = new Product({
    productName,
    price,
    categoryValues,
    description,
    image:req?.file ? req.file?.filename : null,
    userId:userId,
     addedToCart:false,
   })
   await product.save()
   res.status(200).json({message:'Product Saved Successfuly',status:1012})
  }catch(err){
    console.log(err)
    res.status(500).json({ message: "Error adding product" });
  }
})
router.get('/fetch-products',verifyToken,async(req,res)=>{
    try{
        const userId=req.user.userId
        const product = await Product.find({userId}).populate("categoryValues","category")// populate is used to fetch the entire schema of category
        const updatedProduct = product.map(data=>({
            ...data._doc,
            imageUrl: data.image ? `${req.protocol}://${req.get('host')}/upload/${data.image}` : null
        }))
        res.status(200).json({updatedProduct})
    }
    catch(error){
        console.log(error)
        res.status(500).json("Error in fetching")
    }
})

router.get('/fetch-product/:id',verifyToken,async(req,res)=>{
    try{
       const productId=req.params.id
       const userId = req.user.userId
       const product=await Product.findById({_id:productId,userId}).populate("categoryValues","category")
       const {userId:_,...productData}=product._doc; //exclude user id from response
       const updatedData={
        ...productData,
        imageUrl:`${req.protocol}://${req.get('host')}/upload/${product?.image}`
       }
       res.status(200).json(updatedData)
    }
    catch(err){
      console.log(err)
      res.status(500).json({message:"Error",error:err})
    }
})

module.exports = router
