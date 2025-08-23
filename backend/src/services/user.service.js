const User = require('../models/user.model.js');
const createError = require('http-errors');

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


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}