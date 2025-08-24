const userRouter = require('./user.route.js');
const conversationRouter = require('./conversation.route.js');
const messageRouter = require('./message.route.js');

const routes = (app) => {
    app.use('/api/v1',userRouter);
    app.use('/api/v1',conversationRouter);
    app.use('/api/v1',messageRouter);
}

module.exports = routes;