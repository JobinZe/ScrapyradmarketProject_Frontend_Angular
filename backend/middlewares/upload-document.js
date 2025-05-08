const multer=require('multer');
const path = require('path');
const fs = require('fs')

const filePath = path.join(__dirname,'../upload')
if(!fs.existsSync(filePath)){
    fs.mkdirSync(filePath,{recursive:true})
}

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
     cb(null,"upload/")
    },
    filename:(req,file,cb)=>{
     cb(null,Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = (req,file,cb)=>{
    console.log(file,"mime")
    if(file.mimetype=="image/jpeg" || file.mimetype=="image/png" || file.mimetype === "application/pdf"){
        cb(null,true)
    }
    else{
        cb(new Error("File Upload Failed"),false)
    }
}
const upload = multer({storage,fileFilter})
module.exports=upload