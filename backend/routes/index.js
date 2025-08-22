const userRouter = require('./user.route.js');


const routes = (app) => {
    app.use('/api/v1',userRouter);
}

module.exports = routes;