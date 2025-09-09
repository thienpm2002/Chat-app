const Notification = require('../models/notification.model');




const getNotification = async (id) => {
    const notifications = await Notification.find({receiverId: id, isRead: false});
    return notifications;
}

const createNotification = async (id,receiverId) => {
    const notification = await Notification.create({
        senderId: id,
        receiverId,
    });
    return notification;
}

const updateNotification = async (id,senderId) => {
    const notification = await Notification.updateMany({receiverId:id,senderId}, { $set: { isRead: true } },{new: true});
    return notification;
}


module.exports = {
    getNotification,
    createNotification,
    updateNotification
}