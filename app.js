const express =require('express');
const morgon =require('morgan');
const createError=require('http-errors');
const AuthRoute=require('./Routes/Auth.route');
require('./helpers/int_mongodb');

require('dotenv').config();

const app = express();
app.use(morgon('dev'));
const PORT=process.env.PORT;
app.get("/",async(req,res,next)=>{
    res.send("Hello from Express");
 
});

app.use('/auth',AuthRoute)

app.use(async(req,res,next)=>{
 const error=new Error("Not Found");
 error.status=404;
 next(error);
})

app.use(async(req,res,next)=>{
    // res.status(err.status || 500)
    // res.send({
    //     error:{
    //         status:err.status || 500,
    //         message:err.message
    //     }
    // })
    next(createError.NotFound('This route not found'));

})

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
});


