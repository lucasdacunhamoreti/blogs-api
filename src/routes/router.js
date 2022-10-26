const express = require('express');

const routers = express.Router();

const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');

routers.use('/login', authRouter);
routers.use('/user', userRouter);
routers.use('/categories', categoryRouter);

module.exports = routers;