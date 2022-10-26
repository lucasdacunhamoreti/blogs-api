const { schemaNewPost, schemaUpdatePost } = require('./schemas');

const validateNewPost = (body) => {
    const result = schemaNewPost.validate(body);
    return result;
};

const validateUpdatePost = (body) => {
    const result = schemaUpdatePost.validate(body);
    return result;
};

module.exports = { validateNewPost, validateUpdatePost };