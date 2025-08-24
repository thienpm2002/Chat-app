const express = require('express');
const router = express.Router();

const {login,register,logout, refresh} = require('../controllers/auth.controller.js');
const {checkLogin, checkRegister} = require('../middlewares/auth.middleware.js');

router.post('/auth/login',checkLogin,login);

router.post('/auth/register',checkRegister,register);

router.post('/auth/logout',logout);

router.post('/auth/refresh',refresh);

module.exports = router;
