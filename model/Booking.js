const mongoose = require("mongoose")

const carbookingSchema = new mongoose.Schema({

    userid:{
        type:String
    },
    carid:{
        type:String
    },
    name:{
        type:String,
        require:true
    },
    model:{
        type:String,
        require:true
    },
    origin:{
        type:String
    },
    destination:{
        type:String
    },
    startdate:{
        type:String
    },
    enddate:{
        type:String
    },
    bookingdate:{
        type:String
    },
    bookingtime:{
        type:String
    },
    image:{
        type:String
    },
    perKm:{
        type:String
    }
    
})

const CarbookingDetails = mongoose.model("bookingdetails" , carbookingSchema)

module.exports = CarbookingDetails