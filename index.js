//  --- User Roles & Permissions APIs
//  1. --- Create User, Post, Category, Comment, Like, and Permission models.

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/user-roles-permissions');

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const authRoute = require('./routes/authRoute');
app.use('/api', authRoute);

const adminRoute = require('./routes/adminRoute');
app.use('/api/admin', adminRoute);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running on PORT: ${port}`);
})