const express =require('express');
const morgon =require('morgan');
const createError=require('http-errors');
const { body, validationResult } = require('express-validator');

const Address=require('./Models/Address.models');
const User = require('./Models/User.models');


const AuthRoute=require('./Routes/Auth.route');
require('./helpers/int_mongodb');

require('dotenv').config();

const app = express();
app.use(morgon('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));







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
    res.status(err.status || 500)
    res.send({
        error:{
            status:err.status || 500,
            message:err.message
        }
    })
    // next(createError.NotFound('This route not found'));

})

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
});




const validateUserData = [
    /////////Users/////////////////
    body('user.first_name').notEmpty().withMessage('First name is required'),
    body('user.last_name').notEmpty().withMessage('Last name is required'),
    body('user.email').isEmail().withMessage('Invalid email address'),
    body('user.password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('user.phone_number').isMobilePhone().withMessage('Invalid phone number'),

    ///Addresss//////////////////////////


    // Add validation rules for other fields as needed
    body('address.deliverd_person_full_name').notEmpty().withMessage('First name is required'),
    body('address.deliverd_person_phone_number').isMobilePhone().withMessage('Invalid phone number'),
    body('address.pin_code').notEmpty().withMessage('Pincode name is required'),
    body('address.country').notEmpty().withMessage('Countery name is required'),
    body('address.state').notEmpty().withMessage('State name is required'),
    body('address.city').notEmpty().withMessage('City name is required'),
    body('address_type}').notEmpty().withMessage('Please select home or city option'),
    



];








app.post('/register',validateUserData,async(req,res,next)=>{
try{
const {first_name,last_name,dob,phone_number,email,password} =  req.body.user;
const {deliverd_person_full_name, deliverd_person_phone_number,pin_code,country,state,city, landmark, address_type} = req.body.address;

const doesExist=await User.findOne({email:email});




const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
}

if(doesExist){
    throw createError.Conflict(`${email} is already been registered`);
}



           const session = await mongoose.startSession();
           session.startTransaction();

       try{

        await session.withTransaction(async()=>{
            const usersCollection = client.db(DB_NAME).collection('users');
            const addressesCollection = client.db(DB_NAME).collection('addresses');

            const userData = req.body.user;
            const addressData = req.body.address;
         
            const newUser = new User(userData);
            const savedUser=await newUser.save();

            addressData.userId = savedUser._id;
            
            const newAddress = new Address(addressData);
            await newAddress.save();

          

            res.status(201).json({ success: true, message: 'User and address created successfully' });

        });

       }finally{
        session.endSession();
       }

    }catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    } 
})






