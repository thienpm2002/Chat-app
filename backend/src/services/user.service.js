const User = require('../models/user.model.js');
const createError = require('http-errors');
const fs = require('fs');
const path = require('path');

const getUsers = async (id) => {
    return await User.find({ _id: { $ne: id } }).select('_id user_name avatar');
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
        id: user._id,
        user_name: user.user_name,
        avatar: user.avatar
    }
}

const updateProfile = async (id, user_name, file) => {
  const user = await User.findById(id);
  if (!user) throw createError(404, "User not found");

  // Nếu có file thì validate trước
  if (file) {
    if (file.mimetype && !file.mimetype.startsWith("image/")) {
      throw createError(400, "Invalid file type. Only image files are allowed.");
    }

    // Nếu có avatar cũ thì xoá
    if (user.avatar && user.avatar.startsWith("/uploads/")) {
      const filePath = path.join(
        __dirname,
        "..",
        "public",
        user.avatar.replace(/^\/+/, "")
      );
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
          console.log("Deleted old avatar:", filePath);
        } catch (err) {
          console.error("Error deleting old avatar:", err.message);
        }
      }
    }

    // Gán avatar mới
    user.avatar = `/uploads/${file.filename}`;
  }

  // Nếu có user_name thì update
  if (user_name) {
    user.user_name = user_name;
  }

  await user.save();

  return {
    user_name: user.user_name,
    avatar: user.avatar,
  };
};


const search = async (key) => {
   const users = await User.find({
       user_name: { $regex: key, $options: 'i' }
   }).limit(10);

   return users
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getProfile,
    updateProfile,
    search
}