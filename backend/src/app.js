const express = require('express');
const createError = require('http-errors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const routes = require('./routes/index.js');
const logger = require('./config/logger.js');
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('common'));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);

// routes

routes(app);

// API Error
app.use((req,res,next) => {
    next(createError.NotFound());
})

app.use((err,req,res,next) => {
    logger.error(`method: ${req.method} ----- url: ${req.url} ----- message: ${err.message}`);
    res.status(err.status || 500);
    res.json({
        status: err.status || 500,
        message: err.message
    })
})

module.exports = app;