require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/user-roles-permissions');

const express = require('express');
const app = express();
app.use(express.static('public'));

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running on PORT: ${port}`);
    console.log(`Server PORT from ENV is ${process.env.PORT}`)
})