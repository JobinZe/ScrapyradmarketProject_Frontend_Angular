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
    console.log(req.file)
   const {productName,price,categoryValues,description,quantity}  = req.body
   const userId=req.user.userId
   if(!productName || !price || !categoryValues || !description){
    res.status(500).json({message:"Failed to add Product"})
   }
   const product = new Product({
    productName,
    price,
    categoryValues,
     quantity,
    description,
    image:req?.file ? req.file?.filename : null,
    userId:userId,
     addedToCart:false,
     imageName:req?.file ? req.file?.filename : null,
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
        const product = await Product.find({userId,quantityAvailable: true}).populate("categoryValues","category")// populate is used to fetch the entire schema of category
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
router.post('/delete-product/:id',verifyToken,async(req,res)=>{
  const productId = req.params.id;
  const userId = req.user.userId;
  console.log(productId,"product id")
  if(!productId || !userId){
    return res.status(500).json({message:"Product Id is missing"})
  }
  const fetchProductToDelete = await Product.findOne({userId:userId,_id:productId});
  if(!fetchProductToDelete){
    return res.status(200).json({status:1021,message:"Product not found"})
  }
  await fetchProductToDelete.deleteOne()
  return res.status(200).json({status:1022,message:"Product deleted successfully"})
});
router.post('/update-product/:id',verifyToken,async(req,res)=>{
  try {
    const payload = req.body;
    const objectId = req.params.id;
    const userId = req.user.userId;
    console.log(req.body,"payload")
    const findActualProduct = await Product.findOne({userId: userId, _id: objectId})
    console.log(findActualProduct, "fetchproduct")
    if (!findActualProduct) {
      return res.status(400).json({stats: 1022, message: "product doesnt exist"})
    }
    Object.assign(findActualProduct, payload)
    await findActualProduct.save()
    return res.status(200).json({status: 1023, message: "Product updated"})
    const reRun = await Product.findOne({userId: userId, _id: objectId})
console.log(reRun,"after updating")
  }
  catch(error){
    console.log(error)
    return res.status(500).json({stats: 1025, message: "Internal Server Error"})

  }
})
module.exports = router
