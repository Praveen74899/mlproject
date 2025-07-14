const mongoose = require("mongoose");
const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URL);
    console.log(" mongodb Connection successfull ");
};

module.exports = connectDB;