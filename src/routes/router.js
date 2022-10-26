const express = require('express');

const routers = express.Router();

const authRouter = require('./auth.router');
const userRouter = require('./user.router');

routers.use('/login', authRouter);
routers.use('/user', userRouter);

module.exports = routers;