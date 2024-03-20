const express =require('express');
const morgon =require('morgan');
require('./helpers/int_mongodb');
require('dotenv').config();
const app = express();
app.use(morgon('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const PORT=process.env.PORT;

const AuthRoute=require('./Routes/Auth.route');
app.get("/",async(req,res,next)=>{
    res.send("Hello from Express");
 
});

app.use('/auth',AuthRoute)

// app.use(async(req,res,next)=>{
//  const error=new Error("Not Found");
//  error.status=404;
//  next(error);
// })

// app.use(async(req,res,next)=>{
//     res.status(err.status || 500)
//     res.send({
//         error:{
//             status:err.status || 500,
//             message:err.message
//         }
//     })
//     // next(createError.NotFound('This route not found'));

// })

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
});




















