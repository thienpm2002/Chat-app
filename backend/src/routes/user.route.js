const express = require('express');
const router = express.Router();

const { getAllUsers, getUser, createUser, updateUser, deleteUser, getProfile, updateProfile } = require('../controllers/user.controller.js');
const {searchChat} = require('../controllers/search.controller.js');
const {checkRegister,checkUpdateProfile,auth} = require('../middlewares/auth.middleware.js');
const upload = require('../config/multer.js');

router.get('/user/me',auth,getProfile);

router.patch('/user/me',auth,upload.single('avatar'),checkUpdateProfile,updateProfile);

router.get('/user/search',auth,searchChat);

router.get('/user',auth,getAllUsers);

router.get('/user/:id',getUser);

router.post('/user',checkRegister,createUser);

router.patch('/user/:id',checkUpdateProfile,updateUser);

router.delete('/user/:id',deleteUser);

module.exports = router;