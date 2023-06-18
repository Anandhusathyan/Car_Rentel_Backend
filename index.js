const { cloudinary } = require('./utils/cloudinary');
const requireAuth = require("./Middleware/token");
const adminAuth = require("./Middleware/token_admin")
const express = require("express")
const cors = require("cors")
const authroutes = require("./Routes/authroutes")
const Carroutes = require("./Routes/carroutes")
const bookingroutes = require("./Routes/bookingroutes")
require("./db/dbconnection")
const cookieParser = require('cookie-parser');
require('dotenv').config();
const axios = require("axios")

const app = express()
const port = 5000
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use(express.urlencoded({ extended: true }))    
app.use(cookieParser());

const session = require("express-session");
app.use(session({
  secret: 'save-me-god',
  resave: false,
  saveUninitialized: true
}));

app.post('/api/upload', adminAuth, async (req, res) => {
  try {
    const fileStr = req.body[0]

    const uploadResponse = await cloudinary.uploader.upload(fileStr, {   
      // Upload_presets: 'anandhu_image',
      folder: 'anandhu_image',
      tags: req.session.userId,
      context: `name=${req.query.name}|model=${req.query.model}`
    });

    console.log(uploadResponse);
    res.json( uploadResponse.public_id);
  } 
  
  catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }

});

app.get('/api/images', async (req, res) => {


  console.log("req.query.name", req.query.name, req.query.model, req.query.id)

  try {
    const { resources } = await cloudinary.search
      .expression(`folder:anandhu_image AND tags:${req.query.id}`)
      .with_field('context')
      .sort_by('public_id', 'desc')
      .max_results(30)
      .execute();

    console.log("resources", resources);

    const filteredResources = resources.filter((resource) => {
      const { context } = resource;
      console.log("context", context);
      const modelName = context.model;
      const name = context.name;

      return modelName === `${req.query.model}` && name === `${req.query.name}`;
    });



    console.log("filteredResources", filteredResources);

    const publicIds = filteredResources.map((file) => file.public_id);
    console.log("publicIds", publicIds)
    res.status(201).send(publicIds);
  }
  catch (error) {
    console.log("backend", error)
  }

});


app.get('/api/allimages', async (req, res) => {


  console.log("req.query.name", req.query.name, req.query.model)

  try {
    const { resources } = await cloudinary.search
      .expression(`folder:anandhu_image `)
      .with_field('context')
      .sort_by('public_id', 'desc')
      .max_results(30)
      .execute();

    console.log("resources", resources);

    const filteredResources = resources.filter((resource) => {
      const { context } = resource;
      console.log("context", context);
      const modelName = context.model;
      const name = context.name;

      return modelName === `${req.query.model}` && name === `${req.query.name}`;
    });



    console.log("filteredResources", filteredResources);

    const publicIds = filteredResources.map((file) => file.public_id);
    console.log("publicIds", publicIds)
    res.status(201).send(publicIds);
  }
  catch (error) {
    console.log("backend", error)
  }

});



app.post( "/api/deleteimage", async (req,res) => {

  console.log(req.body,process.env.CLOUDINARY_API_KEY,process.env.CLOUDINARY_API_SECRET)
  try {

    
    const options = {
      invalidate: true 
    };

    const deletedimage = await cloudinary.uploader.destroy(req.body.publicId, options);
    console.log("deletedimage",deletedimage);

    res.status(200).json({message:"image deleted"})
    // Handle success or display a success message

  } catch (error) {

    console.log("delete image error",error);
    // Handle error or display an error message

  }
})



app.listen(port, () => {
  console.log(`server running at ${port}`)
})

app.use(authroutes);
app.use(Carroutes);
app.use(bookingroutes);