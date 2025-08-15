const mongoose =require('mongoose');

const userSchema =new mongoose.Schema({

    name:{
        type:String,
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    phn_nuumer:{
        type:Number
    },
    
    address:{
        type:String
    },
    image:{
        type:String
    }
})

const User =mongoose.model('User',userSchema);

module.exports=User;


