import express, { NextFunction } from 'express'
import { Request,Response } from 'express';
import Stripe from 'stripe';

import userRoute from "./routes/user.js"
import productRoute from "./routes/product.js"
import orderRoute from "./routes/order.js"
import paymentRoute from "./routes/payment.js"
import dashboardRoute from "./routes/stats.js"
import { ApiResponse } from './utils/ApiResponse.js'
import {config} from "dotenv";
import connectDB from './utils/features.js';
import { errorMiddleware } from './middlewares/error.js';
import NodeCache from 'node-cache';
import morgan from 'morgan';
import cors from "cors"

const app=express()


config({
    path: "./.env",
});
connectDB()
const port=process.env.PORT || 4000;
const stripeKey=process.env.STRIPE_KEY||"";
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())
//using Routes
export const stripe=new Stripe(stripeKey)

export const myCache=new NodeCache()

app.get('/',(req,res)=>{
    return res.status(200).json(
        new ApiResponse(200,"hello")
    );
})
app.use("/api/v1/user",userRoute);
app.use("/api/v1/product",productRoute);
app.use("/api/v1/order",orderRoute);
app.use("/api/v1/payment",paymentRoute);
app.use("/api/v1/dashboard",dashboardRoute)
app.use("/uploads",express.static("uploads"))

app.use(errorMiddleware)

app.listen(port,()=>{
    console.log(`Server is working on http://localhost:${port}`);
})