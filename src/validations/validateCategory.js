const { schemaNewCategory } = require('./schemas');

const validateNewCategory = (body) => {
    const result = schemaNewCategory.validate(body);
    return result;
};

module.exports = { validateNewCategory };