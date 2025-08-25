const User = require('../models/user.model.js');


const search = async (key) => {
    const users = await User.find({ user_name: { $regex: key, $options: 'i' } }).limit(10);
    return users;
}

module.exports = {
    search
}