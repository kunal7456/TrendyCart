import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility_class.js";
import { TryCatch } from "./error.js";
// Middleware to make sure only admin is allowed
export const adminOnly = TryCatch(async (req, res, next) => {
    const { id } = req.query;
    console.log(id);
    if (!id)
        return next(new ErrorHandler("You are not Logged In", 401));
    const user = await User.findById(id);
    console.log(user);
    if (!user)
        return next(new ErrorHandler("User doesn't exist", 401));
    if (user.role !== "admin")
        return next(new ErrorHandler("You are not allowed to perform this action", 403));
    next();
});
