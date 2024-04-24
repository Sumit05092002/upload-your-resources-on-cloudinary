const file=require('../model/file');
const cloudinary=require('cloudinary').v2;


exports.localUpload=async(req,res)=>{
    try {
        const myfile=req.files.file;
        console.log(myfile);
        const path=__dirname+"/file/"+Date.now()+`.${myfile.name.split('.')[1]}`;
        console.log(path);
        myfile.mv(path,(error)=>{
            console.log(error);
        })
        res.json({
            success:true,
            message:"File uploaded successfully"
        })
    } catch (error) {
        console.log(error);
    }
}



const checkfiletype=(type,fileType)=>{
    return type.includes(fileType);
}



 const uploadFile=async(uploadedfile,folder,quality)=>{
    const options={folder:folder,resource_type:"auto",chunk_size:6000000}
    if(quality){
        options.quality=quality;
    }
    const res= await cloudinary.uploader.upload(uploadedfile.tempFilePath,options);
    console.log(res);
    return res;
}



exports.uploadImage=async(req,res)=>{
    try {
        const {name,email,tags}=req.body;
        console.log(name,email,tags)
        const uploadedFile=req.files.file;
        console.log(uploadedFile);
        const type=['jpg','jpeg','png'];
        const fileType=uploadedFile.name.split('.')[1].toLowerCase();
        if(!checkfiletype(type,fileType)){
            return res.status(400).json({
                success:false,
                message:"file type not supported"
            })
        }

        const response=await uploadFile(uploadedFile,"sumit");
        const fileData=await file.create({name,email,tags,imageUrl:response.secure_url})
        console.log(response);
        res.status(200).json({
            success:true,
            message:"File uploaded to cloudinary successfully",
            data:response
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })

    }
}



exports.uploadVideo=async(req,res)=>{
    try {
        const {name,email,tags}=req.body;
        console.log(name,email,tags);
        const uploadedFile=req.files.file;
        console.log(uploadedFile);
        const supportedTypes=['mp4','mov'];
        const filetype=uploadedFile.name.split('.')[1];
        // console.log(fileType);
        if(!checkfiletype(supportedTypes,filetype)){
            return res.status(400).json({
                success:false,
                message:"file type not supported",
            })
        }
        console.log("sumit");
       const response=await uploadFile(uploadedFile,"sumit");
       const fileData=file.create({name,email,tags,imageUrl:response.secure_url});
       res.status(200).json({
        success:true,
        message:"Video uploaded to cloudinary successfully",
        data:response
       })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error",
        })

    }
}



exports.imageSizeReduce=async(req,res)=>{
    try {
        const {name,email,tags}=req.body;
        console.log(name,email,tags);
        const uploadedFile=req.files.file;
        console.log(uploadedFile);
        const supportedTypes=['jpg','jpeg','png'];
        const fileType=uploadedFile.name.split('.')[1];
        if(!checkfiletype(supportedTypes,fileType)){
            return res.status(400).json({
                success:false,
                message:"File type is not supported"
            })
        }
        const response=uploadFile(uploadedFile,"sumit",30);
        const entry=file.create({name,email,tags,imageUrl:response.secure_url})
        res.status(200).json({
            Success:true,
            message:"File uploaded successfully",
            data:response
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error",
        })
    }
}