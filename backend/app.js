// app.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require("./routers/userRoutes")
const projectRoutes = require('./routers/projectRoutes');
require('dotenv').config(); 

const app = express();

// Middleware to parse JSON requests
app.use(express.json());
// console.log("in app ");
// console.log(userRoutes);

// API Routes
app.use('/api/user', userRoutes);
app.use('/api/project', projectRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Server Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
