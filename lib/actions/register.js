"use server"

import { User } from "@/model/User";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
import { parseServerResponse } from "../utils";
import { connectDB } from "./Connection";
import { mailToGroup, mailToStudent, updateMailStudent } from "./auth";
import mongoose from "mongoose";
import { Group } from "@/model/Group";

const SECRET_KEY = process.env.SECRET_KEY;


export const registerStudent = async ({ formData }) => {
    try {

        const token = await getTokenFromCookies();
        //If no token 
        if (!token) {
            return parseServerResponse({ status: 'FAIL', message: 'Authentication token is missing !! Login Again' })
        }
        const decodedToken = verifyJwt(token);
        // If user is not admin
        if (!decodedToken || decodedToken.role !== 'admin') {
            return parseServerResponse({ status: 'FAIL', message: 'You do not have the required permissions' })
        }

        await connectDB();

        const { name, rollno, branch, course, email, phone, amount } = Object.fromEntries(formData.entries());
        const events = JSON.parse(formData.get('events'));

        console.log("EVENTS IN SERVER : ", events)
        const newUser = new User({ name, rollno, course, branch, email, phone, events });
        await newUser.save();

        await mailToStudent(newUser, amount) // Send Mail to student

        return parseServerResponse({ status: 'SUCCESS', message: `Student Registered Successfully, Token ID : ${newUser.uuid}` })
    } catch (error) {
        console.log("Registration error : ", error.message)
        if (error.code === 11000 && error.message.includes("E11000 duplicate key error collection")) {
            return parseServerResponse({ status: 'FAIL', message: "Already Registered !!" });
        }
        return parseServerResponse({ status: 'FAIL', message: "Registration error" })
    }
}

export const registerGroup = async ({ formData }) => {
    try {

        const token = await getTokenFromCookies();
        //If no token 
        if (!token) {
            return parseServerResponse({ status: 'FAIL', message: 'Authentication token is missing !! Login Again' })
        }
        const decodedToken = verifyJwt(token);
        // If user is not admin
        if (!decodedToken || decodedToken.role !== 'admin') {
            return parseServerResponse({ status: 'FAIL', message: 'You do not have the required permissions' })
        }

        await connectDB();
        const { name, leader, email, phone, amount } = Object.fromEntries(formData.entries());

        const members = JSON.parse(formData.get('members'));

        const event = JSON.parse(formData.get('events'));

        const newGroup = new Group({ name, leader, email, phone, members, event });
        await newGroup.save();

        // Mail to group Leader
        await mailToGroup(newGroup, amount)

        return parseServerResponse({ status: 'SUCCESS', message: 'Group Registered Successfully' })


    } catch (error) {
        console.log("Group Registration error : ", error.message)
        return parseServerResponse({ status: 'FAIL', message: 'Unsuccessful' })
    }
}

export const findStudent = async ({ formData }) => {
    try {

        const token = await getTokenFromCookies();
        //If no token 
        if (!token) {
            return parseServerResponse({ status: 'FAIL', message: 'Authentication token is missing !! Login Again' })
        }
        const decodedToken = verifyJwt(token);
        // If user is not admin
        if (!decodedToken || decodedToken.role !== 'admin') {
            return parseServerResponse({ status: 'FAIL', message: 'You do not have the required permissions' })
        }

        await connectDB();

        const { user_token } = Object.fromEntries(formData.entries());

        const user = await User.find({ uuid: user_token })
        const filteredUser = {
            branch: user[0].branch,
            token: user[0].uuid,
            course: user[0].course,
            name: user[0].name,
            rollno: user[0].rollno,
            email: user[0].email,
            phone: user[0].phone,
            events: user[0].events.map(event => ({
                category: event.category,
                eventName: event.eventName,
                eventGame: event.eventGame || "", // Add the game field if it exists, otherwise set it to an empty string
            })),

        };
        return parseServerResponse({ status: 'SUCCESS', user: filteredUser })
    } catch (error) {
        console.log("Registration error : ", error.message)
        return parseServerResponse({ status: 'FAIL', message: "Registration error" })
    }
}

export const updateStudent = async ({ formData }) => {
    try {

        const token = await getTokenFromCookies();
        //If no token 
        if (!token) {
            return parseServerResponse({ status: 'FAIL', message: 'Authentication token is missing !! Login Again' })
        }
        const decodedToken = verifyJwt(token);
        // If user is not admin
        if (!decodedToken || decodedToken.role !== 'admin') {
            return parseServerResponse({ status: 'FAIL', message: 'You do not have the required permissions' })
        }

        await connectDB();

        const { name, rollno, branch, token: userToken, course, email, phone, amount } = Object.fromEntries(formData.entries());

        const eventsRaw = JSON.parse(formData.get('events'));

        const events = eventsRaw.map(event => ({
            category: event.category,
            eventName: event.eventName,
            ...(event.eventGame && { eventGame: event.eventGame })
        }));

        const updatedUser = await User.findOneAndUpdate(
            { uuid: userToken }, // Search filter
            {
                $set: { name, rollno, branch, course, email, phone, events }, // Update fields
            },
            { new: true, upsert: false } // Return the updated document, do not create a new one
        );

        await updateMailStudent(updatedUser, amount) // Send Mail to student

        return parseServerResponse({ status: 'SUCCESS', message: 'Student Updated Successfully' })
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

export const updateExistingData = async () => {
    try {
        connectDB()

        // const result = await User.updateMany({}, { verification: true });
        console.log(
            `Updated ${result.nModified} documents with verification = true.`
        );
    } catch (error) {
        console.error("Error updating the database:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from the database.");
    }
}