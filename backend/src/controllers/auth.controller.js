const Auth = require('../services/auth.service.js');
const createError = require('http-errors');


const login = async (req,res,next) => {
    try {
        const {accessToken,refreshToken} = await Auth.login(req.body);
        res.cookie("refreshToken",refreshToken,{
             httpOnly: true,       // không cho JS frontend truy cập
            secure: true,         // chỉ gửi qua HTTPS (khi deploy)
            sameSite: "strict",   // chống CSRF
            path: "/",            // đường dẫn cookie
            maxAge: 7 * 24 * 60 * 60 * 1000 
        })
        res.json({
            accessToken,
            message:"Login is sucessfully"
        })
    } catch (error) {
        next(error);
    }
}

const register = async (req,res,next) => {
    try {
        const {accessToken,refreshToken} = await Auth.register(req.body);
        res.cookie("refreshToken",refreshToken,{
             httpOnly: true,       // không cho JS frontend truy cập
            secure: true,         // chỉ gửi qua HTTPS (khi deploy)
            sameSite: "strict",   // chống CSRF
            path: "/",            // đường dẫn cookie
            maxAge: 7 * 24 * 60 * 60 * 1000 
        })
        res.json({
            accessToken,
            message:"Register is sucessfully"
        })
    } catch (error) {
        next(error);
    }
}

const logout = async (req,res,next) => {
    try {
        const token = req.cookies.refreshToken;
        if(!token) next(createError.Unauthorized());
        await Auth.logout(token);
        res.json({message: 'Logout is successfully'});
    } catch (error) {
        next(error);
    }
}

const refresh = async (req,res,next) => {
    try {
        const token = req.cookies.refreshToken;
        if(!token) next(createError.Unauthorized());
        const {accessToken,refreshToken} = await Auth.refresh(token);
        res.cookie("refreshToken",refreshToken,{
             httpOnly: true,       // không cho JS frontend truy cập
            secure: true,         // chỉ gửi qua HTTPS (khi deploy)
            sameSite: "strict",   // chống CSRF
            path: "/",            // đường dẫn cookie
            maxAge: 7 * 24 * 60 * 60 * 1000 
        })
        res.json({
            accessToken,
            message:"RefreshToken is sucessfully"
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    login,
    register,
    logout,
    refresh
}