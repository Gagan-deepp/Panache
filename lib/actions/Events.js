"use server"
import { User } from "@/model/User";
import { parseServerResponse } from "../utils";
import { connectDB } from "./Connection";
import { Group } from "@/model/Group";

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
export const fetchGroupEventData = async (category) => {
    try {
        await connectDB();
        const groups = await Group.find({ 'event.category': category });
        const processedGroups = groups.map(user => ({
            uuid: user.uuid,
            name: user.name,
            leader: user.leader,
            email: user.email,
            phone: user.phone,
            members: user.members.map(member => member.name),
            event: user.event.map(e => e.eventName)
        }));
        return parseServerResponse({ groups: JSON.stringify(processedGroups), status: "SUCCESS" });

    } catch (err) {
        return parseServerResponse({
            error: JSON.stringify(err.message),
            status: "ERROR",
        });
    }

}