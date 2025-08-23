const app = require('./app.js');
const config = require('./config/env.js');
const connectDB = require('./config/db.js');


const PORT = config.port || 3000;

connectDB(config.mongoURI);

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
})