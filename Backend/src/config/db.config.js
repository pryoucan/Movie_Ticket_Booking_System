import mongoose from "mongoose";

export const connectDb = async () => {
    const uri = process.env.MONGODB_URI;
    if(!uri) {
        throw new Error("MONGODB_URI is not set");
    }

    const dbConnection = await mongoose.connect(uri);
    console.log(`Db connected ${dbConnection.connection.host}`);
}