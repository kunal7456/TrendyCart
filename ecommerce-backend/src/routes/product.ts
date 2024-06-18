import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { createProductReview, deleteProduct, deleteReview, getAdminProducts, getAllCategories, getAllProducts, getProductReviews, getSingleProduct, getlatestProducts, newProduct, updateProduct } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";
const app=express.Router();

app.post("/new",singleUpload,newProduct)
app.get("/all",getAllProducts);
app.get("/latest",getlatestProducts)
app.get("/categories",getAllCategories)
app.get("/admin-products", getAdminProducts);
app.route("/:id").get(getSingleProduct).put(singleUpload,updateProduct).delete(deleteProduct);
app.route("/reviews").get(getProductReviews).delete(deleteReview);
app.route("/reviews").put(createProductReview);


export default app