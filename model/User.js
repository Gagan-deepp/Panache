import { nanoid } from "nanoid";
import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true,
        default: () => nanoid(8).toUpperCase(),
    },
    name: {
        type: String,
        required: [true, "Student name is required"],
        trim: true,
    },
    rollno: {
        type: String,
        required: [true, "Roll number is required"],
    },
    course: {
        type: String,
        required: [true, "Course is required"],
        trim: true,
    },
    branch: {
        type: String,
        required: [true, "Branch is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email address is required"],
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Invalid email address",
        ],
    },
    phone: {
        type: String,
        required: true,
        match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },
    events: {
        type: [{
            category: {
                type: String,
                required: [true, "Event category is required"],
            },
            eventName: {
                type: String,
                required: [true, "Event name is required"],
            },
            eventGame: {
                type: String,
            },
        }],
    },

}, { timestamps: true })

// delete mongoose.models['User']; //Replace 'User' with the model name
export const User = mongoose.models.User || mongoose.model("User", UserSchema);