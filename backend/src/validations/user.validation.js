const Joi = require('joi');


const registerSchema = Joi.object().keys({
    user_name: Joi.string().trim().required().max(20),
    email: Joi.string().required().email().trim(),
    password: Joi.string().min(6).max(15).trim().required()
})

const loginSchema = Joi.object().keys({
    email: Joi.string().required().email().trim(),
    password: Joi.string().min(6).max(15).trim().required()
})

const updateProfileSchema = Joi.object().keys({
    user_name: Joi.string().trim().required().max(20),
    avatar: Joi.string().trim()
})

module.exports = {
    registerSchema,
    loginSchema,
    updateProfileSchema
}