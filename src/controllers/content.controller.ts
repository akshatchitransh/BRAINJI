import type { Request,Response } from "express";
import { contentModel } from "../model/user.model.js";


export const content =async (req:Request,res:Response)=>{
const link = req.body.link
const type = req.body.type
await contentModel.create({
link,
type,
userId:req.userId,
tags:[]
})

return res.json({
    msg:"content added"
})
}


export const getcontent =async (req:Request,res:Response)=>{
    const userid = req.userid;
    const content = await contentModel.find({
        userid : userid
    }).populate("userid")

    res.json({
        content
    })

}

export const deletecontent = async(req:Request,res:Response)=>{
    const contentid = req.body.contentid;
    

    await contentModel.deleteMany({
        contentid,
        req.userId
    })
}