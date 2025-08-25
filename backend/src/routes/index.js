const userRouter = require('./user.route.js');
const authRouter = require('./auth.route.js');
const conversationRouter = require('./conversation.route.js');
const messageRouter = require('./message.route.js');
const searchRouter = require('./search.route.js');

const {auth} = require('../middlewares/auth.middleware.js');

const routes = (app) => {
    app.use('/api/v1',userRouter);
    app.use('/api/v1',authRouter);
    app.use('/api/v1',auth,searchRouter);
    app.use('/api/v1',auth,conversationRouter);
    app.use('/api/v1',auth,messageRouter);
}

module.exports = routes;