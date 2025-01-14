import mongoose from "mongoose";
import config from "config";
const db = config.get("mongoURI") as string;

export const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log("MongoDB Connected ...")
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}