const Conversation = require('../models/conversation.model.js');

/*----------------------------------- Service cua chat 1-1 -------------------------*/
const createChat = async (data) => {
        // Check đã tồn tại chưa
        const { senderId,receiverId } = data;
        let conversation = await Conversation.findOne({
            isGroup: false,
            members: { $all: [senderId, receiverId], $size: 2 },
        });
        if(!conversation){
               conversation = await Conversation.create({
                members: [senderId, receiverId],
                isGroup: false
               })
        }
        return conversation;
}

const deleteChatById = async (id) => {
        const conversation = await Conversation.findByIdAndDelete(id);
        if(!conversation){
                throw createError(404,'Conversation not found');
        }
        return conversation;
}

const getAllChatUser = async (userId) => {
    const chats = await Conversation.find({
        isGroup: false,
        members: userId
    })
    .populate("members","user_name avatar")
    .populate({
        path: "latestMessage",
        populate: {path:"senderId", select:"user_name avatar"}
    })
    .sort({updateAt: -1});
    return chats;
}

module.exports = {
    createChat,
    deleteChatById,
    getAllChatUser
}