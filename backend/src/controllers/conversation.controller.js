const Conversation = require('../services/conversation.service.js');



/* Controller cho chat 1-1 */

const createChat = async (req,res,next) => {
    try {
        const senderId = req.payload.userId;
        const data = {senderId,...req.body}
        const chat = await Conversation.createChat(data);
        res.json(chat);
    } catch (error) {
        next(error);
    }
}

const getAllChatUser = async (req,res,next) => {
    try {
        const chats = await Conversation.getAllChatUser(req.payload.userId);
        res.json(chats);
    } catch (error) {
        next(error);
    }
}

const deleteChatById = async (req,res,next) => {
    try {
        await Conversation.deleteChatById(req.params.id);
        res.json({message: 'Delete chat sucessfully'});
    } catch (error) {
        next(error);
    }
}


module.exports = {
    createChat,
    getAllChatUser,
    deleteChatById
}
