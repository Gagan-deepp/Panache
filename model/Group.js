import { v4 as uuidv4 } from "uuid"
import mongoose from "mongoose"

const GroupSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4,
    },
    name: {
        type: String,
        required: [true, "Group name is required"],
        trim: true,
    },
    leader: {
        type: String,
        required: [true, "Group leader name is required"],
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
    members: {
        type: [{
            name: {
                type: String,
                required: [true, "Member name is required"],
            },
        }],
    },
    event: {
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
    },

}, { timestamps: true })

export const Group = mongoose.models.Group || mongoose.model("Group", GroupSchema);