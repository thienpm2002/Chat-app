const express = require('express');
const router = express.Router();

const { getAllUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/user.controller.js');
const {checkRegister,checkUpdateProfile} = require('../middlewares/auth.middleware.js');

router.get('/user',getAllUsers);

router.get('/user/:id',getUser);

router.post('/user',checkRegister,createUser);

router.patch('/user/:id',checkUpdateProfile,updateUser);

router.delete('/user/:id',deleteUser);

module.exports = router;