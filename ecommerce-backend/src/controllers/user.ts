import { NextFunction } from "express";
import { User } from "../models/user.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Response,Request } from "express";
import { NewUserRequestBody } from "../types/types.js";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility_class.js";
export const newUser=TryCatch(async (
    req:Request<{},{},NewUserRequestBody>,
    res:Response,
    next:NextFunction)=>{
        
        const {name,email,photo,gender,_id,dob}=req.body;
        let user= await User.findById(_id);
        if(user){
            return res.status(200).json({
                success:true,
                message:`Welcome, ${user.name}`,
            })
        }

        if(!_id || !name || !photo || !gender || !dob)
            return next(new ErrorHandler("Please add all fields",400));

        
        user=await User.create({
            name,email,photo,gender,_id,dob
        })

         return res.status(200).json(
          {
            success:true,
            message:`Welcome, ${user.name}`,
          }
        )

    }
);

export const getAllUsers=TryCatch(async (req,res,next)=>{
    const users=await User.find({});
    return res.status(201).json({
        success:true,
        users,
    })
})

export const getUser=TryCatch(async (req,res,next)=>{
    const id=req.params.id;
    const user=await User.findById(id);
    if(!user)
        return next(new ErrorHandler("Invalid id",400));
    return res.status(201).json({
        success:true,
        user,
    })
})

export const deleteUser=TryCatch(async (req,res,next)=>{
    const id=req.params.id;
    const user=await User.findById(id);
    if(!user)
        return next(new ErrorHandler("Invalid id",400));

    await user.deleteOne();
    return res.status(201).json({
        success:true,
        message:"User deleted Successfully"
    })
})