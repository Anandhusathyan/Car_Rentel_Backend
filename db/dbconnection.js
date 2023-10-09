//chakravarthy.8328
//chakravarthyE

const mongoose = require("mongoose");
require("dotenv").config();
const db = process.env.MONGO_URL;
//const db="mongodb://127.0.0.1:27017/main-project"

mongoose
  .connect(db)
  .then((res) => {
    console.log("database connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });
