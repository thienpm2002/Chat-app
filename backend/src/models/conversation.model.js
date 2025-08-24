
const mongoose = require('mongoose');


const conversationSchema = mongoose.Schema({
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required: true,
        }
    ],
    name: {
        type: String,
        trim: true
    },
    isGroup: {
        type: Boolean,
        default: false
    },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

},{timestamps: true})


module.exports = mongoose.model('Conversation',conversationSchema);

