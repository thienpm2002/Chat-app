const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
        user_name: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            required: true,
            default: function() {
                return `https://ui-avatars.com/api/?name=${this.user_name}&background=random&rounded=true`;
            }
        },
        lastSeen: { type: Date, default: null },
        refreshTokens: [String]
},{timestamps: true});

module.exports = mongoose.model('User',userSchema);