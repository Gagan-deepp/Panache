"use server"
import nodemailer from "nodemailer"
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
        const cookieStore = await cookies();
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
        return NextResponse.redirect(process.env.Mode === "development" ? 'http://localhost:3000' : "https://panache2025.vercel.app/")
    }

    try {
        const session_data = jwt.verify(token, SECRET_KEY);
        return session_data;
    } catch (error) {
        return null;
    }
}

export const logout = async () => {
    try {
        const cookieStore = await cookies();
        cookieStore.delete('auth_token')
        return NextResponse.redirect(process.env.Mode === "development" ? 'http://localhost:3000' : "https://panache2025.vercel.app/")
    } catch (error) {
        return null;
    }
}

export const mailToStudent = async (user, amount) => {
    try {
        const { name, rollno, course, branch, email, phone, events, uuid } = user;
        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const htmlBody = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank You for Registering - Panache 2025</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <header style="background-color: #4a90e2; color: white; padding: 20px; text-align: center;">
                <h1 style="margin: 0;">Thank You for Registering!</h1>
            </header>
            
            <main style="padding: 20px; background-color: #f9f9f9;">
                <p style="font-size: 16px;">Dear ${name},</p>
                
                <p>Thank you for registering in Panach 2025. We're excited to have you participate in our upcoming events! Here's a summary of your registration:</p>
                <p>Your Token ID : <bold>${uuid}<bold> </p>
                
                <div style="background-color: white; border: 1px solid #ddd; padding: 15px; margin-top: 20px;">
                    <h2 style="color: #4a90e2; margin-top: 0;">Registration Details :</h2>
                    <ul style="list-style-type: none; padding-left: 0;">
                        <li><strong>Name:</strong> ${name}</li>
                        <li><strong>Roll Number:</strong> ${rollno}</li>
                        <li><strong>Course:</strong> ${course}</li>
                        <li><strong>Branch:</strong> ${branch}</li>
                        <li><strong>Email:</strong> ${email}</li>
                        <li><strong>Phone:</strong> ${phone}</li>
                    </ul>
                </div>
                
                <div style="background-color: white; border: 1px solid #ddd; padding: 15px; margin-top: 20px;">
                    <h2 style="color: #4a90e2; margin-top: 0;">Registered Events : </h2>
                    <ul>
                        ${events.map(event => `<li>${event.category} - ${event.eventName === "Online Gaming" ? event.eventGame : event.eventName} </li>`).join('')}
                    </ul>
                </div>
                
                <p style="font-size: 18px; font-weight: bold; margin-top: 20px;">Total Amount: ₹${amount}</p>
                
                <p>We'll be in touch soon with more information about the events. If you have any questions, please don't hesitate to contact us.</p>
            </main>
            
            <footer style="background-color: #4a90e2; color: white; text-align: center; padding: 10px; margin-top: 20px;">
                <p style="margin: 0;">© 2025 Panache. All rights reserved.</p>
            </footer>
        </body>
        </html>
        `;
        // Email for recipient
        const mailOptionsRecipient = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Panache 2025 Registration Success !!",
            html: htmlBody
        };

        await transporter.sendMail(mailOptionsRecipient);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
export const updateMailStudent = async (user, amount) => {
    try {
        const { name, rollno, course, branch, email, phone, events, uuid } = user;
        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const htmlBody = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Update Confirmation - Panache 2025</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <header style="background-color: #4a90e2; color: white; padding: 20px; text-align: center;">
                <h1 style="margin: 0;">Your Registration Details Have Been Updated!</h1>
            </header>
            
            <main style="padding: 20px; background-color: #f9f9f9;">
                <p style="font-size: 16px;">Dear ${name},</p>
                
                <p>We wanted to let you know that your registration for Panache 2025 has been successfully updated. Below are your updated registration details:</p>
                <p>Your Token ID : <strong>${uuid}</strong></p>
                
                <div style="background-color: white; border: 1px solid #ddd; padding: 15px; margin-top: 20px;">
                    <h2 style="color: #4a90e2; margin-top: 0;">Updated Registration Details:</h2>
                    <ul style="list-style-type: none; padding-left: 0;">
                        <li><strong>Name:</strong> ${name}</li>
                        <li><strong>Roll Number:</strong> ${rollno}</li>
                        <li><strong>Course:</strong> ${course}</li>
                        <li><strong>Branch:</strong> ${branch}</li>
                        <li><strong>Email:</strong> ${email}</li>
                        <li><strong>Phone:</strong> ${phone}</li>
                    </ul>
                </div>
                
                <div style="background-color: white; border: 1px solid #ddd; padding: 15px; margin-top: 20px;">
                    <h2 style="color: #4a90e2; margin-top: 0;">Updated Registered Events:</h2>
                    <ul>
                        ${events.map(event => `<li>${event.category} - ${event.eventName === "Online Gaming" ? event.eventGame : event.eventName}</li>`).join('')}
                    </ul>
                </div>
                
                <p style="font-size: 18px; font-weight: bold; margin-top: 20px;">Total Amount: ₹${amount}</p>
                
                <p>If you have any questions or need further assistance, please don't hesitate to reach out to us.</p>
            </main>
            
            <footer style="background-color: #4a90e2; color: white; text-align: center; padding: 10px; margin-top: 20px;">
                <p style="margin: 0;">© 2025 Panache. All rights reserved.</p>
            </footer>
        </body>
        </html>
        `;

        // Email for recipient
        const mailOptionsRecipient = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Panache 2025 Registration Success !!",
            html: htmlBody
        };

        await transporter.sendMail(mailOptionsRecipient);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const mailToGroup = async (group) => {
    try {
        const { uuid, name, leader, email, phone, members, event } = group;

        const amount = 50 * event.length * (members.length + 1); // +1 for the leader

        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const htmlBody = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank You for Registering - Panache 2025</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <header style="background-color: #4a90e2; color: white; padding: 20px; text-align: center;">
                <h1 style="margin: 0;">Thank You for Registering!</h1>
            </header>
            
            <main style="padding: 20px; background-color: #f9f9f9;">
                <p style="font-size: 16px;">Dear ${leader},</p>
                
                <p>Thank you for registering your group in Panache 2025. We're excited to have you and your team participate in our upcoming events! Here's a summary of your registration:</p>
                <p>Your Group Token ID: <strong>${uuid}</strong></p>
                
                <div style="background-color: white; border: 1px solid #ddd; padding: 15px; margin-top: 20px;">
                    <h2 style="color: #4a90e2; margin-top: 0;">Group Registration Details:</h2>
                    <ul style="list-style-type: none; padding-left: 0;">
                        <li><strong>Group Name:</strong> ${name}</li>
                        <li><strong>Group Leader:</strong> ${leader}</li>
                        <li><strong>Email:</strong> ${email}</li>
                        <li><strong>Phone:</strong> ${phone}</li>
                    </ul>
                </div>
                
                <div style="background-color: white; border: 1px solid #ddd; padding: 15px; margin-top: 20px;">
                    <h2 style="color: #4a90e2; margin-top: 0;">Group Members:</h2>
                    <ul>
                        ${members.map(member => `<li>${member.name}</li>`).join('')}
                    </ul>
                </div>
                
                <div style="background-color: white; border: 1px solid #ddd; padding: 15px; margin-top: 20px;">
                    <h2 style="color: #4a90e2; margin-top: 0;">Registered Events:</h2>
                    <ul>
                        ${event.map(e => `<li>${e.eventName} (${e.category})</li>`).join('')}
                    </ul>
                </div>
                
                <p style="font-size: 18px; font-weight: bold; margin-top: 20px;">Total Amount: ₹${amount}</p>
                
                <p>We'll be in touch soon with more information about the events. If you have any questions, please don't hesitate to contact us.</p>
            </main>
            
            <footer style="background-color: #4a90e2; color: white; text-align: center; padding: 10px; margin-top: 20px;">
                <p style="margin: 0;">© 2025 Panache. All rights reserved.</p>
            </footer>
        </body>
        </html>
        `;

        // Email for recipient
        const mailOptionsRecipient = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Panache 2025 Group Registration Success!",
            html: htmlBody
        };

        await transporter.sendMail(mailOptionsRecipient);
        return true;
    } catch (error) {
        console.error("Error sending group registration email:", error);
        return false;
    }

}