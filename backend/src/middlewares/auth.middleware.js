const createError = require('http-errors');
const {registerSchema,loginSchema,updateProfileSchema} = require('../validations/user.validation.js');


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

module.exports = {
    checkLogin,
    checkRegister,
    checkUpdateProfile
}