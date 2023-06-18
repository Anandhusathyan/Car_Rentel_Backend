const { Router }=require('express');
const {UserSignup,Userlogin,AdminSignup,Adminlogin,Logoutuser,Logoutadmin}=require("../controller/authcontroller")
const requireAuth = require("../Middleware/token")
const adminAuth = require("../Middleware/token_admin")

const authroutes=Router();

authroutes.post('/usersignup',UserSignup)
authroutes.post('/userlogin',Userlogin)
authroutes.post('/adminsignup',AdminSignup)
authroutes.post('/adminlogin',Adminlogin)
authroutes.get('/logoutuser',Logoutuser)

module.exports = authroutes