const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const dotenv = require("dotenv");
const cors = require("cors");
const PORT = process.env.PORT;
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api",authRoutes);

app.listen(PORT,()=>{
    console.log(`server running on Port no ${PORT}`);
})
