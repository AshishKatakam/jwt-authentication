const express=require('express');
const app=express();
const mongoose = require('mongoose');
const authRoutes=require('./routes/auth');
const cookieParser=require('cookie-parser');
require('dotenv').config()


app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/jwtauth',
 {
     useNewUrlParser: true,
     useUnifiedTopology:true,
     useCreateIndex:true,
     useFindAndModify:false
 }

)
.then(()=>{
    console.log('DB CONNECTED');
})
.catch((e)=>{
    console.log(e.message);
    console.log('DB connection error');
})


app.use(authRoutes);

app.get('/',(req,res)=>{
    res.redirect('/login');
})

app.listen(5000,()=>{
    console.log('server running on port 5000')
})