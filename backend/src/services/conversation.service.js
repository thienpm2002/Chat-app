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
    members: userId,
  })
    .populate("members", "user_name avatar")
    .populate({
      path: "latestMessage",
      populate: { path: "senderId", select: "user_name avatar" },
    })
    .sort({ updatedAt: -1, createdAt: -1,  });

  return chats.map((chat) => {
    const receiver = chat.members.find(
      (user) => user._id.toString() !== userId.toString()
    );

    let latestMessage = chat.latestMessage?.toObject
      ? chat.latestMessage.toObject()
      : chat.latestMessage;

    if (!latestMessage) {
      latestMessage = { text: "No messages yet" };
    } else if (
      !latestMessage.text &&
      latestMessage.attachments &&
      latestMessage.attachments.length !== 0
    ) {
      latestMessage = { ...latestMessage, text: "Sent file" };
    }

    return {
      chatId: chat._id,
      receiver,
      latestMessage,
    };
  });
};


module.exports = {
    createChat,
    deleteChatById,
    getAllChatUser
}