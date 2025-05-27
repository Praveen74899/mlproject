const mongoose = require('mongoose');
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);  // agar connection fail ho to app ko rok do
    }
};

module.exports = connectDB;
