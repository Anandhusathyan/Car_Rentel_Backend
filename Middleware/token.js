const jwt=require("jsonwebtoken");

const requireAuth = (req,res,next) =>{

     console.log("requireAuth",req.cookies);

    const token=req.cookies.jwt;

    console.log('token',token)

    if(token){
        jwt.verify(token,"net ninja secret",(err,decodedToken)=>{

            if(err){
                console.log(err.message);
                res.status(302).send("change url").end()
            }
            else{
            const {id}= decodedToken;
            req.session.userId=id   
            console.log("decodedToken",decodedToken);
            next();
            }
        })
    }
    else{
        console.log("requireAuth1"); 
        res.status(302).send("change url").end() 
        //res.status(400).json({error:"not found token"})
    }
}

module.exports= requireAuth;