const { schemaUser, schemaNewUser } = require('./schemas');

const validateUser = (body) => {
    const result = schemaUser.validate(body);
    return result;
};

const validateNewUser = (body) => {
    const result = schemaNewUser.validate(body);
    return result;
};

module.exports = { validateUser, validateNewUser };