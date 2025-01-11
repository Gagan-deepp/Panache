"use server"

import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { parseServerResponse } from '../utils';
import { NextResponse } from 'next/server';
const SECRET_KEY = process.env.SECRET_KEY;

export const logInUser = async (form) => {
    try {
        const { username, password } = Object.fromEntries(Array.from(form));
        if (username !== process.env.Admin_username || password !== process.env.Admin_pass) {
            return parseServerResponse({ error: "Invalid credentials", status: "Error" });
        }

        const token = jwt.sign({ username, role: 'admin' }, SECRET_KEY, { expiresIn: '2d' });
        const cookieStore = cookies();
        cookieStore.set('auth_token', token, {
            httpOnly: true,
            path: '/',
            sameSite: 'Strict',
            maxAge: 172800, // 2 days
        });

        return parseServerResponse({ status: 'SUCCESS', message: 'Logged in successfully' })
    } catch (error) {
        console.log(error);

        return parseServerResponse({
            error: JSON.stringify(error),
            status: "ERROR",
        });
    }
}

export const auth = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
        return NextResponse.redirect(process.env.Mode === "development" ? 'http://localhost:3000' : "https://pancahe.vercel.app/")
    }

    try {
        const session_data = jwt.verify(token, SECRET_KEY);
        return session_data;
    } catch (error) {
        return null;
    }

}