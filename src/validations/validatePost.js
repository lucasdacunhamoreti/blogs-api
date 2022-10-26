const { schemaNewPost } = require('./schemas');

const validateNewPost = (body) => {
    const result = schemaNewPost.validate(body);
    return result;
};

module.exports = { validateNewPost };