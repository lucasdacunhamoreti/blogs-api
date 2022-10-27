const express = require('express');
const categoryController = require('../controllers/category.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware.validateToken);

router.post('/', categoryController.newCategory);
router.get('/', categoryController.getCategories);

module.exports = router;