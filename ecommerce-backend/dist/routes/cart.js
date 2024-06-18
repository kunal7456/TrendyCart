import express from "express";
import { addToCart, decreaseQuantity, increaseQuantity, showCartItems } from "../controllers/cart.js";
const app = express.Router();
app.get('/my', showCartItems);
app.post('/add', addToCart);
app.post('/increase', increaseQuantity);
app.post('/decrease', decreaseQuantity);
export default app;
