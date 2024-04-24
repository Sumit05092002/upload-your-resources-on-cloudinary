const express=require('express');
const app=express();

app.listen(3000,()=>{
    console.log("Server started at port no 3000");
})

app.get("/",(req,res)=>{
    res.send("Hello I am your server");
})

app.use(express.json());
const fileupload=require('express-fileupload');
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

const route=require('./routes/File');
app.use("/api/v1/upload",route);

const dbConnect=require('./config/database')
dbConnect();

const cloudinary=require('./config/cloudinary');
cloudinary.cloudinaryConnect();