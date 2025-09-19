require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./config/db');
const { authMiddleware, adminMiddleware } = require('./middleware/auth');

const authRoutes = require('./routes/auth');
const attendanceRoutes = require('./routes/attendance');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'attendance_secret',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static('frontend'));
app.use('/auth', authRoutes);
app.use('/attendance', authMiddleware, attendanceRoutes);
app.use('/admin', authMiddleware, adminMiddleware, adminRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
