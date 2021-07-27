const express=require('express');
const router=express.Router();
const User=require('../models/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const isLoggedIn=require('../middleware');
// const Joi=require('@hapi/joi');

// const schema={
//     name:Joi.string().min(6).required(),
//     email:Joi.string().min(6).required().email(),
//     password:Joi.string().min(6).required(),
//     number:Joi.string().required()
// }

router.get('/register',(req,res)=>{
    res.render('register');
})

router.get('/login',(req,res)=>{
    res.render('login');
})

router.post('/register',async(req,res)=>{
    // const {error}=Joi.validate(req.body,schema);
    // res.send(error.details[0].message);const emailExist=await User.findOne({email:email});

    const {name,number,email,password}=req.body;
    const emailExist=await User.findOne({email:email});
    if(emailExist)return res.status(401).send('email already exists');
    try{
        
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const user=new User({
            name:name,
            email:email,
            password:hashedPassword,
            number:number
        })

        await user.save();
        console.log(user);
        res.status(200).send('user created successfully');
    }catch(e){
        console.log('something gone wrong');
        console.log(e);
        res.status(400).send(e.message);
    }
})

router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email:email});
    if(!user)res.status(404).send('email is not registered');

    const check=await bcrypt.compare(password,user.password);
    if(!check)return res.status(400).send('Invalid password');
    
    const token=jwt.sign({_id:user._id},process.env.JWT_SECRET);
    console.log(token);
    res.cookie('jwt',token,{
        expires:new Date(Date.now()+50000),
        httpOnly:true
    });
    res.redirect('/loggedin');
});

router.get('/loggedin',isLoggedIn,(req,res)=>{
    res.send(
        `Welcome ${req.user.name}, you are loggedin now`
    )
})


module.exports=router