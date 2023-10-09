const CarbookingDetails = require("../model/Booking")



module.exports.Addtocart = async (req,res)=>{


    console.log(req.body,req.session.userId)
    const{ carid,name,type,image,currentDate,currentTime,model,
        origin,destination,startdate,enddate,perKm} =req.body;
    
    let userid= req.session.userId; 
    try{
        
        const car = await CarbookingDetails.create({

            userid,
            carid,
            name,
            model,
            image,
            origin,
            destination,
            startdate,
            enddate,
            bookingdate:currentDate,
            bookingtime:currentTime,
            perKm
            
        })
        res.status(201).json(car)
    }
    catch(err){
            console.log(err)
            res.status(400).send(err);
    }
}



module.exports.Editcart = async (req,res)=>{


    console.log(req.body,req.session.userId)
    const{ carid,name,type,image,currentDate,currentTime,model,
        origin,destination,startdate,enddate} =req.body;

        updateobj={};

        if(origin) updateobj.origin = origin;

        if(destination) updateobj.destination = destination;    

        console.log(updateobj)

    try{
        
        const car = await CarbookingDetails.updateOne({carid,userid: req.session.userId},{$set:updateobj })
        res.status(201).json(car)
    }
    catch(err){
            console.log(err)
            res.status(400).send(err);
    }
}


module.exports.Deletecart = async (req,res)=>{


    console.log("Deletecart",req.body.bookingid,req.session.userId)
    // const{ carid,name,type,image,currentDate,currentTime,model,   
    //     origin,destination,startdate,enddate} =req.body;
    
    // let userid= req.session.userId; 
    try{
        
        const car = await CarbookingDetails.deleteOne({ _id:req.body.bookingid  });
        res.status(201).json(car)
    }
    catch(err){
            console.log(err)
            res.status(400).send(err);
    }
}


module.exports.GetBookedcars = async (req,res)=>{


    console.log("Hello",req.body,req.session.userId);
    
    let userid= req.session.userId;
    try{
        
        const car = await CarbookingDetails.find({userid})
        console.log(car);
        res.status(201).json(car)
    }
    catch(err){
            console.log(err)
            res.status(400).send(err);
    }
}