const notificationService = require('../services/notification.service');

const getNotification = async (req,res,next) => {
    try {
        const notifications = await notificationService.getNotification(req.payload.userId);
        res.json(notifications);
    } catch (error) {
        next(error);
    }
}  

const createNotification = async (req,res,next) => {
    try {
      const notification = await notificationService.createNotification(req.payload.userId, req.body.recieverId);
       res.json(notification);
    } catch (error) {
        next(error);
    }
}  

const updateNotification = async (req,res,next) => {
    try {
       const notification = await notificationService.updateNotification(req.payload.useId,req.body.senderId);
       res.json(notification);
    } catch (error) {
        next(error);
    }
}  


module.exports = {
    getNotification,
    createNotification,
    updateNotification
}