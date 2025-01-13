"use server"

import { Group } from "@/model/Group";
import { User } from "@/model/User";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
import { parseServerResponse } from "../utils";
import { connectDB } from "./Connection";

const SECRET_KEY = process.env.SECRET_KEY;

export const registerStudent = async ({ formData }) => {
    try {

        const token = await getTokenFromCookies();
        //If no token 
        if (!token) {
            return parseServerResponse({ status: 'FAIL', message: 'Authentication token is missing' })
        }
        const decodedToken = verifyJwt(token);
        // If user is not admin
        if (!decodedToken || decodedToken.role !== 'admin') {
            return parseServerResponse({ status: 'FAIL', message: 'You do not have the required permissions' })
        }

        await connectDB();
        const { name, rollno, branch, course, email, phone } = Object.fromEntries(formData.entries());
        const events = [];
        for (let i = 0; i < 3; i++) {
            const category = formData.get(`category${i}`);
            const eventName = formData.get(`eventName${i}`);
            if (category && eventName) {
                events.push({ category, eventName });
            }
        }

        const newUser = new User({ name, rollno, course, branch, email, phone, events });
        await newUser.save();
        return parseServerResponse({ status: 'SUCCESS', message: 'Student Registered Successfully, Please Check Mail Response' })
    } catch (error) {
        console.log("Registration error : ", error.message)
        return parseServerResponse({ status: 'FAIL', message: 'Student Registered Successfully' })
    }
}

export const registerGroup = async ({ formData }) => {
    try {

        const token = await getTokenFromCookies();
        //If no token 
        if (!token) {
            return parseServerResponse({ status: 'FAIL', message: 'Authentication token is missing' })
        }
        const decodedToken = verifyJwt(token);
        // If user is not admin
        if (!decodedToken || decodedToken.role !== 'admin') {
            return parseServerResponse({ status: 'FAIL', message: 'You do not have the required permissions' })
        }

        await connectDB();
        const { name, leader, email, phone } = Object.fromEntries(formData.entries());
        const members = [];
        const event = [];
        for (let i = 0; i < 3; i++) {
            const member = formData.get(`member${i + 1}`);
            if (member) {
                members.push({ name: member });
            }
        }
        const category = formData.get(`category`);
        const eventName = formData.get(`eventName`);
        if (category && eventName) {
            event.push({ category, eventName });
        }

        const newGroup = new Group({ name, leader, email, phone, members, event });
        await newGroup.save();

        return parseServerResponse({ status: 'SUCCESS', message: 'Group Registered Successfully' })


    } catch (error) {
        console.log("Group Registration error : ", error.message)
        return parseServerResponse({ status: 'FAIL', message: 'Student Registered Successfully' })
    }
}

const getTokenFromCookies = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    return token;
};

const verifyJwt = (token) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded;
    } catch (error) {
        return null;
    }
};
