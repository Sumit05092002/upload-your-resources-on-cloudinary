const mongoose=require('mongoose');
const nodemailer=require('nodemailer');
const fileSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String
    },
    tags:{
        type:String
    },

    imageUrl:{
        type:String
    }
})

fileSchema.post("save",async function(doc){
    try {
        
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        let info=await transporter.sendMail({
            from:`sumit`,
            to:doc.email,
            subject:"New file uploaded on cloudinary",
            html: `<p>FIle uploaded on cloudinary successfully</p>`
        })
    } catch (error) {
        
    }
})
module.exports=new mongoose.model("file",fileSchema);