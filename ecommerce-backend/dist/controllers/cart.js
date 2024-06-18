import { TryCatch } from "../middlewares/error.js";
import { Cart } from "../models/Cart.js";
import { Product } from "../models/product.js";
export const showCartItems = TryCatch(async (req, res) => {
    const { id: user } = req.query;
    const cart = await Cart.findOne({ user });
    if (!cart) {
        return res.status(404).json({ message: "Cart is empty" });
    }
    res.status(200).json(cart);
});
export const addToCart = TryCatch(async (req, res) => {
    const { productId } = req.body;
    const { id: user } = req.query;
    let cart = await Cart.findOne({ user });
    if (!cart) {
        cart = new Cart({ user, products: [] });
    }
    const product = await Product.findById(productId);
    cart.products.push({ product: productId, 1: Number });
    await cart.save();
    res.status(200).json(cart);
});
export const increaseQuantity = TryCatch(async (req, res) => {
    const { productId } = req.body;
    const { id: user } = req.query;
    const cart = await Cart.findOne({ user });
    if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
    }
    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
    cart.products[productIndex].quantity += 1;
    await cart.save();
    res.status(200).json(cart);
});
export const decreaseQuantity = TryCatch(async (req, res) => {
    const { productId } = req.body;
    const { id: user } = req.query;
    const cart = await Cart.findOne({ user });
    if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
    }
    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
    cart.products[productIndex].quantity -= 1;
    await cart.save();
    res.status(200).json(cart);
});
