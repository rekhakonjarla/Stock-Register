import  express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
// import login from "./model/login.js";
import shop from "./model/shop.js";


const app=express()
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
mongoose.connect('mongodb+srv://rekhakonjarla:Chinni__30@cluster0.jo4rfj1.mongodb.net/?retryWrites=true&w=majority')
.then(()=>app.listen(4500))
.then(()=>console.log("connected to database and listining to localhost 4500"))
.catch((err)=>console.log(err));
//login

//add to cart
app.post('/addToCart',(req,res,next)=>{
    console.log(req.body)
    const {imageurl,name,stars,discount,originalPrice,discountedPrice}=req.body
    const sho=new shop({
        imageurl,name,stars,discount,originalPrice,discountedPrice 
    })
    sho.save()
    .then(() => {
        console.log('Item added to cart:', sho);
        return res.status(200).json({ message: 'Item added to cart successfully', shop: sho });
    })
    .catch(error => {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    });
})
app.delete('/deleteshopdata/:id',async(req,res,next)=>{
    let shopdata;
    const id=req.params.id
    try{
        shopdata=await shop.findByIdAndDelete({_id:id})
        if(!shopdata){
            return res.status(404).json({ message: "No shop data found." });
        }
        return res.status(200).json({ message: "Shop data deleted successfully", shopData: shopdata });
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ error: 'Internal Server Error' });
    
    }
})
app.get('/getshopdata',async(req,res,next)=>{
    let shopdata;
    try{
        shopdata=await shop.find();
    }catch(err){
        console.log(err);
    }
    if(!shopdata){
        return res.status(404).json({message:"no shopdata found."})

    }
    return res.status(200).json({shopdata})
    }
)
// app.get('/getshopdatabyid/:id',async(req,res,next)=>{
//     const _id=req.params.id;
//     let shopdata; 
//     try{
//         shopdata=await student.findById(_id);
//     }catch(err){
//         console.log(err);
//     }
//     if(!shopdata){ 

//         return res.status(404).json({message:"no student found."})

//     }
//     return res.status(200).json({shopdata})
//     }
// )
// app.put('/updatestudent/:id',async(req,res,next)=>{
//     const _id=req.params.id
//     const{name,rollno,college,branch}=req.body.formdata
//     let stud;

//     try{
//         stud=await student.findByIdAndUpdate
//         (_id,{})
//     }catch(err){
//         console.log(err);
//     }
//     return res.send({msg:"updated","result":shop})

// })


