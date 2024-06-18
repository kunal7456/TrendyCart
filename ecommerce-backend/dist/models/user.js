import mongoose from "mongoose";
import validator from 'validator';
const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, "Please enter ID"]
    },
    name: {
        type: String,
        required: [true, "Please enter Name"]
    },
    email: {
        type: String,
        unique: [true, "Email already Exist"],
        required: [true, "Please enter your mail"],
        validate: validator.default.isEmail,
    },
    photo: {
        type: String,
        required: [true, "Please enter photo"],
    },
    role: {
        type: String,
        enum: ['admin', "user"],
        default: "admin",
    },
    gender: {
        type: String,
        enum: ['male', "female"],
        required: [true, "Please enter photo"]
    },
    dob: {
        type: Date,
        required: [true, "Please enter dob"]
    }
}, {
    timestamps: true
});
//schema.virtual("age").get(function () {...}): This line is creating a virtual property called age for the schema.
//Virtual properties are not stored in the database but are computed on the fly when you access them.
UserSchema.virtual("age").get(function () {
    const today = new Date();
    const dob = this.dob;
    let age = today.getFullYear() - dob.getFullYear();
    if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth()
        && today.getDate() < dob.getDate()))
        age--;
    return age;
});
export const User = mongoose.model("User", UserSchema);
