const jwt=require("jsonwebtoken");

const adminAuth = (req,res,next) =>{

     console.log("requireAuth",req.headers);
     console.log("require",req.headers["authorization"]);

    const token=req.headers["authorization"]

    //console.log(token);

    //console.log('token',token)

    if(token){

        const tokenwithoutquotes = token.replace(/"/g,'');

        jwt.verify(tokenwithoutquotes,"anandhu daa",(err,decodedToken)=>{

            if(err){
                console.log(err.message);
                res.status(302).send("change url100").end()
            }
            else{
            const {adminid}= decodedToken;
            req.session.adminId=adminid 
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

module.exports= adminAuth;