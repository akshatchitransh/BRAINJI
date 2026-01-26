import jwt from "jsonwebtoken"
import type{ Request ,Response,NextFunction } from "express"
import "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    userid?: string;
  }
}

export const authmiddleware = (req:Request,res:Response,next:NextFunction)=>{
const header = req.headers.authorization 
if(!header) return res.json({msg:"no token"})
    const token = header.split(" ")[1]
const secret = process.env.jwtkey
if(!token) return res.json({msg:"no token"})

if(!secret){
    return res.json({msg:"no secret"})

}

interface JwtUserPayload {
  _id: string;
}

const decoded = jwt.verify(token, secret) as unknown as JwtUserPayload;



req.userid = decoded._id;



}