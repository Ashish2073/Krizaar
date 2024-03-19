const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const AddressSchema=new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
   
    deliverd_person_full_name:{
        type:String,
        required:true,
    },
    deliverd_person_phone_number:{
        type:String,
        required:true,
    },
    pin_code:{
            type:String,
            required:true,    
        },

    country:{
        type:String,
        rquired:true,
    },    
    
    state:{
        type:String,
        required:true,
    },

    city:{
        type:String,
        required:true,
    },
    landmark:{
        type:String,
    },
    address_type:{
        type:String,
    }

  
     
    
    },{timestamp:true});
    
    const Address = mongoose.model('addresses',AddressSchema);
    module.exports=Address 
    