const postService = require('../services/post.service');

const newPost = async (req, res) => {
    const { error } = postService.validateBody(req.body);

    if (error) {
        return res.status(400).json({ message: error.message });
    }
    const { code, erro, message } = await postService.newPost(req.body, req.user);
    if (erro) {
        return res.status(code).json({ message: erro });
    }
    return res.status(code).json(message);
};

module.exports = { newPost };