import jwt from "jsonwebtoken"
import type{ Request ,Response,NextFunction } from "express"


export const authmiddleware = (req:any,res:Response,next:NextFunction)=>{
const header = req.headers.authorization 
if(!header) return res.json({msg:"no token"})
    const token = header.split(" ")[1]
const secret = process.env.jwtkey
if(!token) return res.json({msg:"no token"})

if(!secret){
    return res.json({msg:"no secret"})

}

interface JwtUserPayload {
  id: string;
}

const decoded = jwt.verify(token, secret) as unknown as JwtUserPayload;

console.log(decoded)

req.userId = decoded.id;
console.log("authchala")
console.log("iiid",req.userId)

next();

}