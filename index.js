const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('./configs/passport.config');
const session = require('express-session');

const connectDB = require('./configs/db.config');

const authRoutes = require('./routes/user.route');
const projectRoutes = require('./routes/project.route');
const testResultRoutes = require('./routes/testresult.route.js');

const app = express();

// ✅ MOVE BODY PARSING MIDDLEWARE UP HERE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SESSION_SECRET || "yoursecretkey",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    })
);

app.use(passport.initialize());
app.use(passport.session());

connectDB();

const PORT = process.env.PORT;

app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://caffetest.vercel.app' // Fixed: added https://
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/project', projectRoutes);
app.use('/api/v1/test', testResultRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});