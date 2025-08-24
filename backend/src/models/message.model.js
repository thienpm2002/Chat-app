const mongoose = require('mongoose');


const messageSchema = mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true
    },
    text: {
        type: String,
        trim: true
    },
    attachments: [
        {
            url: { type: String, required: true },
            type: { type: String, enum: ["image", "video", "document", "other"], required: true }
        }
    ],
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},{timestamps: true});


messageSchema.pre("validate", function (next) {
  if (!this.text && (!this.attachments || this.attachments.length === 0)) {
    next(new Error("Message must have text or file"));
  } else {
    next();
  }
});

module.exports = mongoose.model('Message',messageSchema);