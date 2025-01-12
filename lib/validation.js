import { z } from "zod"

export const loginSchema = z.object({
    username: z.string().min(5),
    password: z.string().min(3)
})

const eventSchema = z.object({
    category: z.string().min(1, { message: "Category is required" }),
    eventName: z.string().min(1, { message: "Event Name is required" }),
});

export const registerSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    rollno: z.string(),
    course: z.string().min(1, { message: "Course is required" }),
    branch: z.string().min(1, { message: "Branch is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z
        .string()
        .regex(/^\d{10}$/, { message: "Phone number must be 10 digits" }),
    events: z
        .array(eventSchema)
        .length(3, { message: "Exactly 3 events are required" })
});
