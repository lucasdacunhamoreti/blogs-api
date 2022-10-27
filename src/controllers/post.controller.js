const postService = require('../services/post.service');

const newPost = async (req, res) => {
    const userId = req.user;
    const { error } = postService.validateBody(req.body);

    if (error) {
        return res.status(400).json({ message: error.message });
    }
    const { code, erro, message } = await postService.newPost(req.body, userId);
    if (erro) {
        return res.status(code).json({ message: erro });
    }
    return res.status(code).json(message);
};

const getPosts = async (req, res) => {
    const result = await postService.getPosts(req.user);
    return res.status(200).json(result);
};

const getPostById = async (req, res) => {
    const { id } = req.params;
    const result = await postService.getPostById(req.user, id);
    if (!result) {
        return res.status(404).json({ message: 'Post does not exist' });
    }
    return res.status(200).json(result);
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const userId = req.user;
    const { error } = postService.validateBodyUpdatePost(req.body);

    if (error) {
        return res.status(400).json({ message: error.message });
    }
    const { code, erro, message } = await postService.updatePost(req.body, id, userId);
    if (erro) {
        return res.status(code).json({ message: erro });
    }
    return res.status(code).json(message);
};

const deletePost = async (req, res) => {
    const { id } = req.params;
    const { code, erro, message } = await postService.deletePost(req.user, id);
    if (erro) {
        return res.status(code).json({ message: erro });
    }
    return res.status(code).json(message);
};

const getPostsByQuery = async (req, res) => {
    const { q } = req.query;
    const result = await postService.getPostsByQuery(q, req.user);
    return res.status(200).json(result);
};

module.exports = { newPost, getPosts, getPostById, updatePost, deletePost, getPostsByQuery };