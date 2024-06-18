import express from "express"
import { allCoupons, applyDiscount, createPaymentIntent, deleteCoupon, newCoupon, sendEmail } from "../controllers/coupon.js";
import { adminOnly } from "../middlewares/auth.js";
const app=express.Router();

app.post("/create",createPaymentIntent);
app.post("/coupon/new",newCoupon);
app.get("/discount",applyDiscount);
app.post("/coupon/new", adminOnly, newCoupon);
app.get("/coupon/all", adminOnly, allCoupons);
app.delete("/coupon/:id", adminOnly, deleteCoupon);
app.post("/mail",sendEmail);

export default app