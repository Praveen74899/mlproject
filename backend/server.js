const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./configures/db');
require('dotenv').config();

const projectRoutes = require('./routes/projectRoutes');


const app = express();
app.use(express.json());
app.use(cors());


//routes
app.use('/api',projectRoutes);

connectDB();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

