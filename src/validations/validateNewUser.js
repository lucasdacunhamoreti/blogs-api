const { schemaNewUser } = require('./schemas');

const validateNewUser = (body) => {
    const result = schemaNewUser.validate(body);
    return result;
};

module.exports = { validateNewUser };