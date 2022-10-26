const express = require('express');
const postController = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', authMiddleware.validateToken, postController.newPost);
router.get('/', authMiddleware.validateToken, postController.getPosts);
router.get('/:id', authMiddleware.validateToken, postController.getPostById);
router.put('/:id', authMiddleware.validateToken, postController.updatePost);

module.exports = router;