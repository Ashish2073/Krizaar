const User = require("../Models/User.models");
const Address = require("../Models/Address.models");
const { check,validationResult} = require('express-validator');
const mongoose = require("mongoose");
const createError=require('http-errors');

const AddUser = async(req,res)=>{
  
    const session = await mongoose.startSession();
    session.startTransaction();
      

     
 
     try {


           
        const { first_name, last_name, dob, phone_number, email, password } = req.body.user;

        console.log(req.body);
 
         const { deliverd_person_full_name, 
                deliverd_person_phone_number,
                pin_code, country, state, city,
                landmark, address_type } = req.body.address;
 
     const doesExist = await User.findOne({ email: email });
 
     const errors = validationResult(req);
 
     if (!errors.isEmpty()) {
       return res.status(400).json({ success: false, errors: errors.array() });
     }
 
     if (doesExist) {
       throw createError.Conflict(`${email} is already been registered`);
     }
 
     
   
     
         const userData = req.body.user;
         const addressData = req.body.address;
 
         const newUser = new User(userData);
         const savedUser = await newUser.save({session});
       
 
         addressData.userId = savedUser._id;
 
         const newAddress = new Address(addressData);
        await newAddress.save({session});
      

         await session.commitTransaction();
         session.endSession();
      
 
         res.status(201).json({ success: true, message: 'User and address created successfully' });

      
     } catch (error) {
       console.error('Error:', error);
       await session.abortTransaction();
       session.endSession();
   
       res.status(500).json({ success: false, message: 'Internal server error' });
     } 
  
}

module.exports = {AddUser}