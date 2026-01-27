import type { Request,Response } from "express";
import { contentModel, LinkModel } from "../model/user.model.js";
import { random } from "../utils.js";
import mongoose from "mongoose";

 

export const content =async (req:any,res:Response)=>{
 
const link = req.body.link
const role = req.body.type

const userid = req.userId;
if (!userid) {
  return res.status(401).json({ msg: "Unauthorized" });
}

const useriid = new mongoose.Types.ObjectId(userid);


await contentModel.create({
link,
role,
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
        await LinkModel.create({
            userId:useriid,
            hash:random(10)
        })
    }
    else {
        await LinkModel.deleteOne({
            userid:req.userId
        })
    }

}