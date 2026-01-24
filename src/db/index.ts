import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI
const connectdb = async()=>{
try{
    if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}
    await mongoose.connect(MONGO_URI)
}
catch(err){
    console.log(err)
}}