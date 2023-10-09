const CarDetails  = require("../model/car");



module.exports.AddCar= async ( req,res )=>{
    
    console.log(req.body,req.session.userId)
    const{ name,cartype,model,milage,perKm,availableFrom,availableTill,description
        ,public_id,carDetails,Details} =req.body;
    
    let AdminId = req.session.adminId; 
    console.log("AdminId",AdminId);
    try{
        
        const car = await CarDetails.create({
            AdminId,
            name,
            cartype,
            model, 
            milage,
            perKm,
            availableFrom, 
            availableTill,
            description,
            images:public_id,
            carDetails,
            Details
        })
        res.status(201).json(car)
    }
    catch(err){
            console.log(err)
            res.status(400).send(err);
    }
}


module.exports.EditCar= async (req,res)=>{

    console.log( "req.body",req.body,req.query )

    let editing_data={}

    if(req.query.images){
        editing_data["images"]=req.query.images;
    }


    for(let prop in req.body){

        if(prop != "_id"){

            editing_data[prop]=req.body[prop]
        }

    }

    console.log("editing_data",editing_data);   

    try{
        const updatecar = await CarDetails.updateOne({_id:req.body._id},{$set:editing_data});    
        res.status(201).json(updatecar)
    }
    catch(err){
        console.log(err)
        res.status(400).json(err);
    }

}

module.exports.DeleteCar = async(req,res)=>{

   console.log("deleteadmincar",req.body);      

    try{
        const deletedcar = await CarDetails.deleteOne(req.body);
        res.status(201).json({message:"deleted sucessfuly"})
    }
    catch(err){
        console.log(err)
        res.status(400).json(err);
    }
    
}

module.exports.GetAllCar = async ( req,res )=>{
    
    try{
        
        const car = await CarDetails.find({})
        console.log("GetAllCar",car);
        res.status(201).json(car);
    }
    catch(err){
            console.log(err)
            res.status(400).send(err);
    }
}

module.exports.GetAdminCar= async ( req,res )=>{

    console.log(req.session.adminId)

    
    let AdminId = req.session.adminId; 
    try{

        console.log()
        
        const car = await CarDetails.find({AdminId})
        //console.log("car",car);
        res.status(201).json(car)
    }
    catch(err){
            console.log(err)
            res.status(400).send(err);
    }
}