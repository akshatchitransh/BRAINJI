import type { Request,Response } from "express";
import { userModel } from "../model/user.model.js";
import { createUserSchema } from "../validators/user.zod.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const signup = async(req:Request,res:Response)=>{
    const parsed = createUserSchema.safeParse(req.body);

      if (!parsed.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: parsed.error.format(),
    });
  }

    const { username, password } = parsed.data;
    const exists = await userModel.findOne({username})
if(exists){
    return res.status(200).json({msg:"user already exists"})
}

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

     const user = await userModel.create({ username, password:hash })

  return res.status(201).json({
    message: "User created",
    user,
  });
};


export const signin = async(req:Request,res:Response)=>{
    const parsed = createUserSchema.safeParse(req.body);

      if (!parsed.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: parsed.error.format(),
    });
  }

    const { username, password } = parsed.data;

const checkuser = await userModel.findOne({username});
if(!checkuser) return res.json({msg:"user not exist"})

    const np = checkuser.password
   const check= bcrypt.compareSync(password,np); 
    if(!check) return res.json({msg:"wrong credentials"})
      const secret = process.env.jwtkey


if(!secret){
    return res.json({msg:"no secret"})

}
        
        const token = jwt.sign({
            id:checkuser._id
        },secret)

        return res.json({msg:"login done",token})
    


};



     

