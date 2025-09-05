const userService = require('../services/user.service.js');



const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getUsers(req.payload.userId);
        res.json(users);
    } catch (error) {
        next(error);
    }
}

const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await userService.getUserById(id);
        res.json(user);
    } catch (error) {
        next(error);
    }
}

const createUser = async (req, res, next) => {
    try {
         console.log("BODY:", req.body); 
        const user = await userService.createUser(req.body);
        res.json(user);
    } catch (error) {
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const user = await userService.updateUser(req.params.id,req.body);
        res.json({
            user,
            message: 'User updated successfully'
        });
    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        await userService.deleteUser(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
}

const getProfile = async (req, res, next) => {
    try {
        console.log(req.payload.userId);
        const data = await userService.getProfile(req.payload.userId);
        res.json(data);
    } catch (error) {
        next(error);
    }
}

const updateProfile = async (req, res, next) => {
    try {
        const id = req.payload.userId;
        const {user_name} = req.body;
        const data = await userService.updateProfile(id,user_name,req.file);
        res.json(data);
    } catch (error) {
        next(error);
    }
}

const search = async (req, res, next) => {
    try {
        const {key} = req.query;
        if(!key) return res.json({});
        const users = await userService.search(key);
        res.json(users);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getProfile,
    updateProfile,
    search
}