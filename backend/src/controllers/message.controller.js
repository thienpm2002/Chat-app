const messageService = require('../services/message.service.js');



const createMessage = async (req,res,next) => {
    try {
        const {conversationId} = req.params;
        const senderId = req.payload?.userId; 
        if (!senderId) return next(createError(401, 'Unauthenticated'));
        const { text } = req.body;
        const message = await messageService.createMessage({ senderId, text }, req.files, conversationId);
        res.json(message);
    } catch (error) {
        next(error);
    }
}

const getAllMessage = async (req,res,next) => {
    try {
        const {conversationId} = req.params;
        const messages = await messageService.getAllMessage(conversationId);
        res.json(messages);
    } catch (error) {
        next(error);
    }
}

const getAllFile = async (req,res,next) => {
    try {
        const {conversationId} = req.params;
        const files = await messageService.getAllFile(conversationId);
        res.json(files);
    } catch (error) {
        next(error);
    }
}

const deleteMessage = async (req,res,next) => {
    try {
        await messageService.deleteMessage(req.params.id);
        res.json({message: "Delete message successfully"});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createMessage,
    getAllMessage,
    deleteMessage,
    getAllFile
}