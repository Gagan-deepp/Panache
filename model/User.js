import { v4 as uuidv4 } from "uuid"
import mongoose from "mongoose"


const UserSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true,
        default : uuidv4,
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
        }],
        validate: {
            validator: function (events) {
                return events.length === 3;
            },
            message: "Exactly 3 events are required",
        },
    },

}, { timestamps: true })

export const User = mongoose.models.User || mongoose.model("User", UserSchema);