require('dotenv').config();


module.exports = {
    port: process.env.PORT || 3000,
    mongoURI: process.env.MONGO_URI,
    refreshTokenKey: process.env.REFRESH_TOKEN_KEY,
    accessTokenKey: process.env.ACCESS_TOKEN_KEY
};