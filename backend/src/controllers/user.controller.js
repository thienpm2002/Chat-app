const userService = require('../services/user.service.js');



const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getUsers();
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

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}