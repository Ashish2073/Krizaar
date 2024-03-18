const mongoose= require('mongoose')
const schema=mongoose.Schema;
const UserSchema=new Schema({
   
    
email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },

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

password:{
    type:String,
    required:true

},



},{timestamp:true});

const User = mongoose.model('user',UserSchema);
module.exports=User

