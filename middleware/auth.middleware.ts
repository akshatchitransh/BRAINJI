import jwt from "jsonwebtoken"
import type{ Request ,Response,NextFunction } from "express"

// const authmiddleware = (req:Request,res:Response,next:NextFunction)=>{
// const headers = req.headers 
// const decoded = jwt.verify(headers,password)
//}