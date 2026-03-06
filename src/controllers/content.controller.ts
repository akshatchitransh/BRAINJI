import type { Request,Response } from "express";
import { contentModel, LinkModel, userModel } from "../model/user.model.js";
import { random } from "../utils.js";
import mongoose from "mongoose";
import { populate } from "dotenv";

 

export const content =async (req:any,res:Response)=>{
 
const title = req.body.title
const link = req.body.link
const type = req.body.type;
console.log(type)
const userid = req.userId;
if (!userid) {
  return res.status(401).json({ msg: "Unauthorized" });
}

const useriid = new mongoose.Types.ObjectId(userid);


await contentModel.create({
  title,
link,

type,
userId:useriid,
tags:[]
})

return res.json({
    msg:"content added"
})
}



export const getcontent = async (req: any, res: Response) => {
 const userid = req.userId;
if (!userid) {
  return res.status(401).json({ msg: "Unauthorized" });
}

const useriid = new mongoose.Types.ObjectId(userid);

  const content = await contentModel.find({
    userId: useriid
  }).populate("userId");

  res.json({ content });
};


export const deletecontent = async (req: any, res: Response) => {
  const userid = req.userId;
  if (!userid) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  await contentModel.deleteOne({
    _id: req.body.contentid,
    userId: userid
  });

  res.json({ msg: "content deleted" });
};


export const sharing = async(req:any, res:Response)=>{

    const share = req.body.share;
    const userid = req.userId;
if (!userid) {
  return res.status(401).json({ msg: "Unauthorized" });
}

const useriid = new mongoose.Types.ObjectId(userid);

    if(share){
       const doc= await LinkModel.create({
            userId:useriid,
            hash:random(10)
        })
        await doc.populate("userId","-password")
        return res.json({doc})

    }
    else {
        await LinkModel.deleteOne({
            userId:req.userId
        })
   return res.json({"msg":"link access closed"}) }

return res.json({"msg":"link access denied"})}

  export const sharedcontent =async(req:Request,res:Response)=>{
  const hash = req.params.sharelink;
  if(hash){const links =await LinkModel.findOne({
    hash
  })

  if(!links){
    return res.json({"msg":"no content"})
    return;
  }
  const content = contentModel.findOne({
    userId:links.userId
  })
  const userinfo = await userModel.findOne({
    _id:links.userId
  })
  if(!userinfo){
    return res.json({"msg":"no user found"})
    return
  }
  res.json({
"username":userinfo.username,
content: content
  })
  }
  else {return res.json({"msg":"access hash wrong "})}



  }
