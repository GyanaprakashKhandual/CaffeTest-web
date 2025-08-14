const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// Functions
const connectDB = require('./config/DB');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Connect to Database
connectDB();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
});
