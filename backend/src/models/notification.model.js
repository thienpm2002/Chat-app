
const mongoose = require('mongoose');


const notificationSchema = mongoose.Schema({
    senderId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiverId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})


module.exports = mongoose.model('Notification', notificationSchema);