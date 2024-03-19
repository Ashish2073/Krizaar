const mongoose= require('mongoose');

const Schema=mongoose.Schema;
const UserSchema= new Schema({
   
    
first_name:{
    type:String,
    required:true,


},
last_name:{
    type:String,
    required:true,
},

dob:{
    dob: Date
},
phone_number:{
    type:String,
    required:true
},

email:{
    type:String,
    required:true,
    lowercase:true,
    unique:true
},

password:{
    type:String,
    required:true

},





},{timestamp:true});

const User = mongoose.model('users',UserSchema);
module.exports=User

