const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel.js');

exports.isUserAuthenticate = async(req,res,next)=>{
    let token;
    const {authorization} = req.headers;
   //console.log(authorization);

    if(authorization && authorization.startsWith("Bearer")){
        try{
            token = authorization.split(" ")[1];
            const {userID} = jwt.verify(token,'top_secret') ;
            req.user = await userModel.findById(userID).select("--password");
            next();


        }
        catch(err) {
            return res.status(401).json({message:"Unauthorized user"});
        }   
       
    }
    else{
        return res.status(401).json({message:"Unauthorized user"});
    }
}

