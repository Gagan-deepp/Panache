"use server"

import { User } from "@/model/User";
import { connectDB } from "./Connection";
import { parseServerResponse } from "../utils";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;


export const registerStudent = async ({ formData }) => {
    try {

        const token = await getTokenFromCookies();
        if (!token) {
            return parseServerResponse({ status: 'FAIL', message: 'Authentication token is missing' })
        }
        const decodedToken = verifyJwt(token);
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

        return parseServerResponse({ status: 'SUCCESS', message: 'Student Registered Successfully' })


    } catch (error) {
        console.log("Registration error : ", error.message)
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
