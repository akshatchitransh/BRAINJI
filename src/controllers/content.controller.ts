import type { Request,Response } from "express";
import { contentModel, LinkModel, userModel } from "../model/user.model.js";
import { random } from "../utils.js";
import mongoose from "mongoose";
import { populate } from "dotenv";
import { pipeline } from "@xenova/transformers";
import { Pinecone } from "@pinecone-database/pinecone";

let count = 1;
async function run(title:any , contentId:any) {
  const pc = new Pinecone({
    //@ts-ignore
    apiKey: process.env.PINECONE_API_KEY,
  });

  // ✅ correct
  const namespace = pc.index("tweets-index","https://tweets-index-a5igeas.svc.aped-4627-b74a.pinecone.io");

  const extractor = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2"
  );

  const text = title;

  const output = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });

  const embedding = Array.from(output.data);

  console.log("Embedding length:", embedding.length);

  // ✅ FINAL FIX
   await namespace.upsert({
    records: [
      {
        id: contentId.toString(),
        values: embedding,
        metadata: { text },
      },
    ],
  });
  count ++;

  console.log("embedding generated");
}



 

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


const newContent = await contentModel.create({
  title,
  link,
  type,
  userId: useriid,
  tags: []
});

await run(title, newContent._id);

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
const titletodelete = req.body.title;

  await contentModel.deleteOne({
   
   title:titletodelete
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
const content = await contentModel.find({
  userId: links.userId
});
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

 export const searchContent = async (req: any, res: Response) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        msg: "Search query is required",
      });
    }

    const pc = new Pinecone({
      //@ts-ignore
      apiKey: process.env.PINECONE_API_KEY,
    });

    const namespace = pc.index(
      "tweets-index",
      "https://tweets-index-a5igeas.svc.aped-4627-b74a.pinecone.io"
    );

    const extractor = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );

    const output = await extractor(query, {
      pooling: "mean",
      normalize: true,
    });

    const embedding = Array.from(output.data);

    const result = await namespace.query({
      vector: embedding,
      topK: 5,
    });

    // IDs nikalo
    const ids = result.matches?.map((match: any) => match.id) || [];

    // MongoDB se poore documents lao
    const contents = await contentModel.find({
      _id: { $in: ids },
    });

    return res.json(contents);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      msg: "Something went wrong",
    });
  }
};