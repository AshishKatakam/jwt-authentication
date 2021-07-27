const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        max:100,
        min:6
    },
    email:{
        type:String,
        unique:true,
        required:true,
        max:100,
        min:6
    },
    password:{
        type:String,
        required:true,
    },
    number:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const User=new mongoose.model('User',userSchema);
module.exports=User;