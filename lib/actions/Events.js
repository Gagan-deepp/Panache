"use server"
import { User } from "@/model/User";
import { parseServerResponse } from "../utils";
import { connectDB } from "./Connection";

export const fetchEventData = async (category) => {
    try {
        await connectDB();
        const users = await User.find({ 'events.category': category });

        const processedUsers = users.map(user => ({
            uuid: user.uuid,
            rollno: user.rollno,
            name: user.name,
            email: user.email,
            event: user.events.map(event => event.eventName)
        }));
        return parseServerResponse({ users: JSON.stringify(processedUsers), status: "SUCCESS" });

    } catch (err) {
        return parseServerResponse({
            error: JSON.stringify(err.message),
            status: "ERROR",
        });
    }

}