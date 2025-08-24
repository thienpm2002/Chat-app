const Message = require('../models/message.model.js');
const createError = require('http-errors');
const path = require('path');
const fs = require('fs');

const createMessage = async (data,files,conversationId) => {
    const {text,senderId} = data;

    if(!text && (!files || files.length === 0)){
          throw  createError(400,'Message must have text or file');
    }
    const attachments = files.map(file => {
        let fileType = "other";

        if (file.mimetype.startsWith("image/")) {
            fileType = "image";
        } else if (file.mimetype.startsWith("video/")) {
            fileType = "video";
        } else if (
            file.mimetype === "application/pdf" ||
            file.mimetype.includes("msword") ||
            file.mimetype.includes("officedocument")
        ) {
            fileType = "document";
        }

        return {
            url: `/uploads/${file.filename}`,  // đường dẫn file
            type: fileType
        };
    });

    return await Message.create({
        conversationId,
        senderId,
        text,
        attachments
    }) 
}

const getAllMessage = async (conversationId) => {
   return await Message.find({conversationId: conversationId});
}

const deleteMessage = async (id) => {
    const message = await Message.findById(id);

    if (!message) {
        throw createError(404, 'Message not found');
    }

    // Nếu có attachments thì xóa file vật lý trong /public/uploads
    if (message.attachments && message.attachments.length > 0) {
        message.attachments.forEach(file => {
            const filePath = path.join(__dirname, '..', 'public', file.url.replace(/^\/+/, '')); 
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Không thể xóa file: ${filePath}`, err.message);
                } else {
                    console.log(`Đã xóa file: ${filePath}`);
                }
            });
        });
    }

    // Xóa document trong DB
    await Message.findByIdAndDelete(id);

    return { success: true };
}



module.exports = {
    createMessage,
    getAllMessage,
    deleteMessage
}