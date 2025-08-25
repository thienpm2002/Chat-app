const jwt = require('jsonwebtoken');

const {accessTokenKey,refreshTokenKey} = require('../config/env.js');


const createAccessToken = (userId) => {
    return jwt.sign(
        { userId },
        accessTokenKey,
        { expiresIn: "3m" }
    );
};

const createRefreshToken = (userId) => {
    return jwt.sign(
        { userId },
        refreshTokenKey,
        { expiresIn: "7d" }
    );
};

module.exports = {
    createAccessToken,
    createRefreshToken
}