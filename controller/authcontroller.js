const User = require("../model/user");
const jwt = require('jsonwebtoken');
const Admin =require("../model/admin")

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'That Email Is Already Registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }


// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'net ninja secret', {
    expiresIn: maxAge
  });
};

const admintoken = (adminid) => {
  return jwt.sign({ adminid }, 'anandhu daa', {
    expiresIn: maxAge
  });
};

module.exports.UserSignup = async (req,res) =>{
    console.log("in UserSignup")
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        // const token = createToken(user._id);
        // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json(user);
      }
      catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
      }
}

module.exports.Userlogin = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)

    let errormessage="";
  
    try {
      const user = await User.login(email, password);
     
      const token = createToken(user._id);
      console.log(token)
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json(user);
    } 
    
    catch (err) {
      if(err.message.includes('incorrect password')||  
      err.message.includes('incorrect email')){

        errormessage = 'Invalid User Details';

    }
    res.status(400).json(errormessage); 
    }
  
}

module.exports.AdminSignup = async (req,res) =>{
  console.log("in AdminSignup")
  const { email, password,contact, Name } = req.body;
  try {
      const user = await Admin.create({ email, password, Name, contact  });
      res.status(201).json(user);
    }
    catch(err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
}

module.exports.Adminlogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  let errormessage="";

  try {
    const admin = await Admin.login(email, password);
    const token = admintoken(admin._id);

    res.cookie('adminjwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(200).json({Admin:admin});

  } catch (err) {

    console.log("from adminlogin",err);

    if(err.message.includes('incorrect password')||
    err.message.includes('incorrect email')){
      errormessage = 'Invalid Admin Details';
    }
    
    res.status(400).json(errormessage);  
  }

}

module.exports.Logoutuser = (req, res) => {

  console.log(req.cookies)

  if(req.cookies.jwt && req.cookies.adminjwt){
     
    res.cookie('jwt', '', { maxAge: 1 });
    res.cookie('adminjwt', '', { maxAge: 1 });
    res.status(302).send("change url").end()

  }

  else if(req.cookies.adminjwt){
     
    res.cookie('adminjwt', '', { maxAge: 1 });
    res.status(302).send("change url").end()

  }

  else if(req.cookies.jwt ){
     
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(302).send("change url").end()

  }

  // res.cookie('jwt', '', { maxAge: 1 });
  // res.status(302).send("change url").end()
}
