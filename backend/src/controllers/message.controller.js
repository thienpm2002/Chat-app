const messageService = require('../services/message.service.js');



const createMessage = async (req,res,next) => {
    try {
        const {conversationId} = req.params;
        const senderId = req.payload.userId;
        const data = {senderId,...req.body};
        const message = await messageService.createMessage(data,req.files,conversationId);
        res.json({message});
    } catch (error) {
        next(error);
    }
}

const getAllMessage = async (req,res,next) => {
    try {
        const {conversationId} = req.params;
        const messages = await messageService.getAllMessage(conversationId);
        res.json({messages});
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
    deleteMessage
}