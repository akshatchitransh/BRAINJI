import mongoose, { model } from "mongoose";
import { required } from "zod/mini";
const userSchema = new mongoose.Schema({
    username:{type : String , unique:true,required:true},
    password:{type:String, required:true }
},{timestamps:true});

export const userModel = model("Users",userSchema)


const ContentSchema = new mongoose.Schema({
    title : String,
    link : String,
    tags : [{type:mongoose.Types.ObjectId , ref:'Tag'}],
    userId : {type: mongoose.Types.ObjectId , ref :'Users', required: true},
type:String,

    
},{timestamps:true})
export const contentModel = model("Contents",ContentSchema)

const linksSchema = new mongoose.Schema({
  hash : String,
  userId : {type : mongoose.Types.ObjectId , ref:"Users",required:true,  unique:true},

})
export const LinkModel = model("links",linksSchema)