const jwt=require('jsonwebtoken');
const User=require('./models/user');


async function isLoggedIn(req,res,next){
    console.log('in middleware');
    const token=req.cookies.jwt;
    // console.log(req.cookies);
    if(!token)return res.status(401).send('Access Denied');

    try{
        const verified=jwt.verify(token,process.env.JWT_SECRET);
        console.log(verified);
        const {_id}=verified;
        req.user=await User.findById(_id);
        next();
    }catch(err){
        res.status(401).send('you need to login first');
    }
}

module.exports=isLoggedIn