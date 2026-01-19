import "./bootstrap.js";

import express from "express";

import { connectDb } from "./config/db.config.js";

const app = express();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDb();

        app.listen(PORT, () => {
        console.log(`Server is running on port:${PORT}`);
    });
    }
    catch(error) {
        console.log("Start up failed:", error);
        process.exit(1);
    }
};

startServer();