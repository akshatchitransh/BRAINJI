import mongoose, { model } from "mongoose";
import { required } from "zod/mini";
const userSchema = new mongoose.Schema({
    username:{type : String , unique:true,required:true},
    password:{type:String, required:true }
},{timestamps:true});

export const userModel = model("Users",userSchema)