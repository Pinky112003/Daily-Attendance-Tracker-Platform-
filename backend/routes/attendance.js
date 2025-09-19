const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.post('/mark', attendanceController.markAttendance);
router.get('/history', attendanceController.getHistory);
router.get('/login-logs', attendanceController.getLoginLogs);

module.exports = router;
