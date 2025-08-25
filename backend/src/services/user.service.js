const User = require('../models/user.model.js');
const createError = require('http-errors');
const fs = require('fs');
const path = require('path');

const getUsers = async () => {
    return await User.find();
}

const getUserById = async (id) => {
    const user = await User.findById(id);
    if(!user){
        throw createError(404,'User not found');
    }
    return user;
}

const createUser = async (data) => {
      return await User.create(data);
}

const updateUser = async (id,data) => {
    const user =  await User.findByIdAndUpdate(id,data,{new: true});
    if(!user){
        throw createError(404,'User not found');
    }
    return user;
}

const deleteUser = async (id) => {
    const user =  await User.findByIdAndDelete(id);
    if(!user){
        throw createError(404,'User not found');
    }
    return user;
}

const getProfile = async(id) => {
    const user = await User.findById(id);
    if(!user){
        throw createError(404,'User not found');
    }
    return {
        user_name: user.user_name,
        avatar: user.avatar
    }
}

const updateProfile = async (id, name, file) => {
  const user = await User.findById(id);
  if (!user) throw createError(404, 'User not found');

  if (user.avatar && user.avatar.startsWith('/uploads/')) {
    const filePath = path.join(__dirname, '..', 'public', user.avatar.replace(/^\/+/, ''));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  if (file) user.avatar = `/uploads/${file.filename}`;
  if (name) user.user_name = name;

  await user.save();

  return {
    user_name: user.user_name,
    avatar: user.avatar,
  };
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getProfile,
    updateProfile
}