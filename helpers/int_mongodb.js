const mongoose=require('mongoose');
require('dotenv').config();
 mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('database connected');
})
.catch(error=>console.log(error.message));


// process.on('SIGINT',async()=>{
//     await mongoose.connection.close();
//     process.exit(0);
// });

