const express = require('express');

const routers = express.Router();

const authRouter = require('./auth.router');

routers.use('/login', authRouter);

module.exports = routers;