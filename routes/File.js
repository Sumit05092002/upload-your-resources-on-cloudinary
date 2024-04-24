const express=require('express');
const router=express.Router();

const{uploadImage,uploadVideo,imageSizeReduce,localUpload}=require('../controllers/fileUpload')
router.post("/uploadImage",uploadImage);
router.post("/videoUpload",uploadVideo);
router.post("/imageSizeReduce",imageSizeReduce);
router.post("/localUpload",localUpload);

module.exports=router;