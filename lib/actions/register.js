"use server"

import { User } from "@/model/User";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
import { parseServerResponse } from "../utils";
import { connectDB } from "./Connection";
import { mailToStudent } from "./auth";

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

        const { name, rollno, branch, course, email, phone, amount } = Object.fromEntries(formData.entries());
        const events = [];
        for (let i = 0; i < 4; i++) {
            const category = formData.get(`category${i}`);
            const eventName = formData.get(`eventName${i}`);
            const eventGame = formData.get(`eventGame${i}`);

            if (category && eventName) {
                const event = { category, eventName };

                if (eventGame) {
                    event.eventGame = eventGame;
                }
                events.push(event)
            }
        }

        const newUser = new User({ name, rollno, course, branch, email, phone, events });
        await newUser.save();

        await mailToStudent(newUser, amount) // Send Mail to student

        return parseServerResponse({ status: 'SUCCESS', message: 'Student Registered Successfully, Please Check Mail Response' })
    } catch (error) {
        console.log("Registration error : ", error.message)
        return parseServerResponse({ status: 'FAIL', message: "Registration error" })
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
