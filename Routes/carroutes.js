const { Router }=require('express');
const {AddCar,EditCar,DeleteCar,GetAdminCar}=require("../controller/carcontroller");
const adminAuth = require("../Middleware/token_admin")
//const carDetails=require("../model/car");

const Carroutes=Router();


// Admin routes
Carroutes.post('/addadmincar',adminAuth,AddCar)
Carroutes.post('/editadmincar',adminAuth,EditCar)
Carroutes.post('/deleteadmincar',adminAuth,DeleteCar)
Carroutes.get('/getadmincar',adminAuth,GetAdminCar)     



module.exports = Carroutes 