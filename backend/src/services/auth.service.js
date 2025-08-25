const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');

const {createAccessToken,createRefreshToken} = require('../utils/jwt.js');
const {refreshTokenKey} = require('../config/env.js');


const login = async (data) => {
    const {email, password} = data;
    const user = await User.findOne({email});
    if(!user) throw createError.Unauthorized();
    const isPassword = await bcrypt.compare(password,user.password);
    if(!isPassword) throw createError.Unauthorized();
    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);
    return {accessToken,refreshToken} ;
}

const register = async (data) => {
    const {user_name, email, password} = data;
    const user = await User.findOne({email});
    if(user) throw createError(400,'Email already exists');
    const hashPassword = await bcrypt.hash(password,10);
    const newUser = await User.create({
        user_name,
        email,
        password: hashPassword,
        refreshTokens: [] 
    })
    const accessToken = createAccessToken(newUser._id);
    const refreshToken = createRefreshToken(newUser._id);
    newUser.refreshTokens.push(refreshToken);
    await newUser.save();
    return {accessToken,refreshToken} ;
}



const logout = async (token) => {
   const payload = await jwt.verify(token,refreshTokenKey);
   if(!payload) return next(createError.Unauthorized()); 
   const user = await User.findById(payload.userId);
   if(!user) throw createError.Unauthorized();
   user.refreshTokens = user.refreshTokens.filter(refreshToken => refreshToken !== token);
   await user.save();
   return user;
}


const refresh = async (token) => {
    const payload = await jwt.verify(token,refreshTokenKey);
    if(!payload) return next(createError.Unauthorized()); 
    const user = await User.findById(payload.userId);
    if(!user) throw createError.Unauthorized();
    user.refreshTokens = user.refreshTokens.filter(refreshToken => refreshToken !== token);
    await user.save();
    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);
    user.refreshTokens.push(refreshToken);
    await user.save();
    return {accessToken,refreshToken};
}

module.exports = {
    login,
    register,
    logout,
    refresh
}