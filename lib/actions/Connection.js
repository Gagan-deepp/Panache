import mongoose from "mongoose";

let isConnect = false

export const connectDB = async () => {

    if (isConnect) {
        console.log('You are connected to DB')
        return;
    }

    try {
        console.log("URI : " ,process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI)
        isConnect = true
        console.log("Congrats you are connected to DB")
    } catch (error) {
        console.log("DB connect Error -->", error)
    }
}