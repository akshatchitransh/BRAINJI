import mongoose, { model } from "mongoose";
import { required } from "zod/mini";
const userSchema = new mongoose.Schema({
    username:{type : String , unique:true,required:true},
    password:{type:String, required:true }
},{timestamps:true});

export const userModel = model("Users",userSchema)


const ContentSchema = new mongoose.Schema({
    title : String,
    linnk : String,
    tags : [{type:mongoose.Types.ObjectId , ref:'Tag'}],
    userId : {type: mongoose.Types.ObjectId , ref :'Users', required: true},
    
})
export const contentModel = model("Contents",ContentSchema)