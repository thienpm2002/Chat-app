const express = require('express');
const router = express.Router();
const {createChat, getAllChatUser, deleteChatById} = require('../controllers/conversation.controller.js');

/*-------------------- Router chat 1-1 --------------------*/

router.get('/chat',getAllChatUser);

router.post('/chat',createChat);

router.delete('/chat/:id',deleteChatById);




module.exports = router;