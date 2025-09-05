const Message = require('../models/message.model.js');
const createError = require('http-errors');
const path = require('path');
const fs = require('fs');

const createMessage = async ({ senderId, text }, files = [], conversationId) => {
  // accept text OR message
  if (!text && (!files || files.length === 0)) {
    throw createError(400, 'Message must have text or file');
  }

  const attachments = (files || []).map(file => {
    let fileType = "other";
    if (file.mimetype?.startsWith("image/")) fileType = "image";
    else if (file.mimetype?.startsWith("video/")) fileType = "video";
    else if (
      file.mimetype === "application/pdf" ||
      file.mimetype.includes("msword") ||
      file.mimetype.includes("officedocument")
    ) fileType = "document";

    return { url: `/uploads/${file.filename}`, type: fileType };
  });

  const newMessage = await Message.create({
    conversationId,
    senderId,
    text,
    attachments
  });

  const message = await newMessage.populate("senderId", "_id user_name avatar");
  const {senderId: sender,conversationId: chatId, ...rest} = message.toObject();
  return {
    ...rest,
    sender,
    chatId
  };
};

const getAllMessage = async (conversationId) => {
   const messages =  await Message.find({conversationId}).populate('senderId', '_id user_name avatar').lean();
   return messages.map((msg) => {
    const {senderId: sender,conversationId: chatId, ...rest} = msg;
    return {
      ...rest,
      sender,
      chatId
    };
   });
}

const getAllFile = async (conversationId) => {
   const messages =  await Message.find({conversationId}).select('attachments').lean();
   let files = [];
   messages.forEach((msg) => {
    const {attachments} = msg;
    if( attachments.length !== 0) {
       files = [...files,...attachments];
    };
   });
   return files;
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
    deleteMessage,
    getAllFile
}