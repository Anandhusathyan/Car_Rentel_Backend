const mongoose = require("mongoose")

const carSchema = new mongoose.Schema({

    AdminId:{
        type:String
    },
    name:{
        type:String,
        require:true
    },
    cartype:{
        type:String,
        require:true
    },
    model:{
        type:String,
        require:true
    },
    milage:{
        type:String,
        require:true
    },
    perKm:{
        type:String
    },
    availableFrom:{
       type:String
    },
    availableTill:{
        type:String
    },
   
    description:{
        type:String
    },
    images:{
        type:String
    },
    carDetails:{
        type:String
    },
    Details:{
        type:String
    }
})

const CarDetails = mongoose.model("cardetails" , carSchema)

module.exports = CarDetails