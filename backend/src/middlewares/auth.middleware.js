const createError = require('http-errors');
const jwt = require('jsonwebtoken');

const {registerSchema,loginSchema,updateProfileSchema} = require('../validations/user.validation.js');
const {accessTokenKey} = require('../config/env.js');

const checkLogin = (req,res,next) => {
    const {error,value} = loginSchema.validate(req.body);
    if(error){
        next(createError(400,error.message));
    }
    req.body = value;
    next();
}

const checkRegister = (req,res,next) => {
    const {error,value} = registerSchema.validate(req.body);
    if(error){
        next(createError(400,error.message));
    }
    req.body = value;
    next();
}

const checkUpdateProfile = (req,res,next) => {
    const {error,value} = updateProfileSchema.validate(req.body);
    if(error){
        next(createError(400,error.message));
    }
    req.body = value;
    next();
}

const auth = (req,res,next) => {
    try {
         const authHeader = req.headers['authorization'];
         if(!authHeader) return next(createError.Unauthorized());
         const token = authHeader.split(" ")[1];
         jwt.verify(token,accessTokenKey,(err,user) => {
            if(err){
                if(err.name === 'JsonWebTokenError'){
                return next(createError.Unauthorized());
                }
                return next(createError.Unauthorized(err.message));
            }
            req.payload = user;
            next();
         })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    checkLogin,
    checkRegister,
    checkUpdateProfile,
    auth
}