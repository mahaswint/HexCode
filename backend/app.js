// app.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require("./routers/userRoutes");
const passport = require("passport");
const cors = require("cors");
const cookieSession = require('cookie-session');
const projectRoutes = require('./routers/projectRoutes');
const passportSetup = require('./config/passport');
const authRoutes = require('./routers/auth');
const session = require('express-session');
require('dotenv').config(); 

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

app.use(
    session({
        secret: process.env.SECRETKEY, 
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, 
    })
);



app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true,
  })
)

app.use("/auth",authRoutes);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

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
