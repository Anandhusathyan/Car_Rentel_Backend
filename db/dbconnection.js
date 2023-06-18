//chakravarthy.8328
//chakravarthyE

const mongoose = require("mongoose");
require("dotenv").config();
const db = process.env.MONGO_URL;

mongoose
  .connect(db)
  .then((res) => {
    console.log("database connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });
