const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', userController.newUser);
router.get('/', authMiddleware.validateToken, userController.getUsers);
router.get('/:id', authMiddleware.validateToken, userController.getUser);

module.exports = router;