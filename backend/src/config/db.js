const mongosse = require('mongoose');


const connectDB = async (uri) => {
    try {
        await mongosse.connect(uri);
         console.log('✅ MongoDB connected');
    } catch (error) {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    }
}

module.exports = connectDB;