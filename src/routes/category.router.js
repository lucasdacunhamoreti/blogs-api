const express = require('express');
const categoryController = require('../controllers/category.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', authMiddleware.validateToken, categoryController.newCategory);
router.get('/', authMiddleware.validateToken, categoryController.getCategories);

module.exports = router;