const jwt=require("jsonwebtoken");

const adminAuth = (req,res,next) =>{

     //console.log("requireAuth",req.cookies);

    const token=req.cookies.adminjwt;

    //console.log('token',token)

    if(token){
        jwt.verify(token,"anandhu daa",(err,decodedToken)=>{

            if(err){
                console.log(err.message);
                res.status(302).send("change url").end()
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