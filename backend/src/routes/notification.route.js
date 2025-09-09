const express = require('express');
const router = express.Router();

const { getNotification, createNotification, updateNotification } = require('../controllers/notification.controller');

router.get('/notification',getNotification);  // Lay ra cac Notification chua doc cua nguoi hien tai

router.post('/notification',createNotification);  // Tao ra Notification chua doc cua nguoi hien tai

router.patch('/notification',updateNotification);  

module.exports = router;