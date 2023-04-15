// import mongoose from "mongoose";
const mongoose=require("mongoose");
const mongoURI =
  "mongodb://127.0.0.1:27017/deepNotebook";
const connectToMongoose = () => {
    mongoose.set("strictQuery",false)
  mongoose.connect(mongoURI);
  console.log("connected")  
};

module.exports=connectToMongoose;
