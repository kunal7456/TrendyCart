import express from "express";
import { newUser,getAllUsers, getUser, deleteUser } from "../controllers/user.js";
import { adminOnly } from "../middlewares/auth.js";
const app=express.Router();

app.post("/new",newUser);
//../api/v1/user/all
app.get("/all", getAllUsers);
//dynamic id
app.route("/:id").get(getUser).delete( deleteUser)

export default app;