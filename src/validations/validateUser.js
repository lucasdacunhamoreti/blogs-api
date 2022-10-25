const { schemaUser } = require('./schemas');

const validateUser = (body) => {
    const result = schemaUser.validate(body);
    return result;
};

module.exports = { validateUser };