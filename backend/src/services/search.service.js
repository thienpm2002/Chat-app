const User = require('../models/user.model.js');

const search = async (key,userId) => {
    const users = await User.find({
                user_name: { $regex: key, $options: 'i' },
                _id: { $ne: userId }
            }).limit(10);
    return users;
}

module.exports = {
    search
}