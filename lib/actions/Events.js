"use server"
import { User } from "@/model/User";
import { parseServerResponse } from "../utils";
import { connectDB } from "./Connection";
import { Group } from "@/model/Group";

export const fetchEventData = async (category, page = 1, pageSize = 50, filters) => {
    try {
        await connectDB();
        const skip = (page - 1) * pageSize

        const query = { "events.category": category }

        if (filters?.event && filters?.event !== "all") {
            query["events.eventName"] = filters.event
        }

        if (filters?.date) {
            query.createdAt = {
                $gte: new Date(filters.date),
                $lt: new Date(new Date(filters.date).setDate(new Date(filters.date).getDate() + 1)),
            }
        }

        if (filters?.course) {
            query["course"] = filters.course;
            if (filters?.branch) {
                query["branch"] = filters.branch
            }
        }

        if (filters?.searchTerm) {
            query.$or = [
                { name: { $regex: filters.searchTerm, $options: "i" } },
                { email: { $regex: filters.searchTerm, $options: "i" } },
            ]
        }

        const [users, totalCount] = await Promise.all([
            User.find(query).skip(skip).limit(pageSize).lean(),
            User.countDocuments(query),
        ])
        const processedUsers = users.map(user => ({
            token: user.uuid,
            rollno: user.rollno,
            name: user.name,
            email: user.email,
            event: user.events.map(event => event.eventName === "Online Gaming" ? event.eventGame : event.eventName),
            createdAt: user.createdAt,
            phone: user.phone,
            course: user.course,
            branch: user.branch,
        }));
        return parseServerResponse({ users: JSON.stringify(processedUsers), totalCount, status: "SUCCESS" });

    } catch (err) {
        return parseServerResponse({
            error: JSON.stringify(err.message),
            status: "FAIL",
        });
    }

}
export const fetchGroupEventData = async (category) => {
    try {
        await connectDB();
        const groups = await Group.find({ 'event.category': category });
        const processedGroups = groups.map(user => ({
            token: user.uuid,
            name: user.name,
            leader: user.leader,
            email: user.email,
            phone: user.phone,
            createdAt: user.createdAt,
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