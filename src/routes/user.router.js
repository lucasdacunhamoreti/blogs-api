const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', userController.newUser);

router.use(authMiddleware.validateToken);

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.delete('/me', userController.deleteUser);

module.exports = router;