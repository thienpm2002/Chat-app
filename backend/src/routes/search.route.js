const express = require('express');
const router = express.Router();

const { searchChat } = require('../controllers/search.controller.js');


router.get('/search',searchChat);

module.exports = router;