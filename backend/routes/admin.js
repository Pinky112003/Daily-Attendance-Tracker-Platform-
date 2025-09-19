const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/add', adminController.addEmployee);
router.get('/report', adminController.getReport);
router.post('/send-notification', adminController.sendNotification);
router.post('/send-bulk-notification', adminController.sendBulkNotification);
router.get('/employees', adminController.getEmployees);

module.exports = router;
