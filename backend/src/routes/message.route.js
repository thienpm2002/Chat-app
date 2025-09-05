const express = require('express');
const router = express.Router();

const upload = require('../config/multer.js');
const { createMessage, getAllMessage, deleteMessage,getAllFile } = require('../controllers/message.controller');

router.post('/message/:conversationId',upload.array('attachments',6),createMessage);

router.get('/message/:conversationId',getAllMessage);

router.delete('/message/:id',deleteMessage);

router.get('/message/:conversationId/files', getAllFile);

module.exports = router;
