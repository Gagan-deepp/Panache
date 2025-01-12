import mongoose from "mongoose";

let isConnect = false

export const connectDB = async () =>{
    mongoose.set('strictQuery') //# to avoid console warning

    if(isConnect){
        console.log('You are connected to DB')
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI ,{
            useNewUrlParser : true,
            useUnifiedTopology : true
        })
        isConnect = true
        console.log("Congrats you are connected to DB")
    } catch (error) {
        console.log("DB connect Error -->",error)
    }
}