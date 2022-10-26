const { Category } = require('../models');
const { validateNewCategory } = require('../validations/validateCategory');

const validateBody = (body) => {
    const result = validateNewCategory(body);
    return result;
};

const newCategory = async ({ name }) => {
    const categoryInsert = await Category.create({ name });
    return categoryInsert;
};

const getCategories = async () => {
    const categories = await Category.findAll();
    return categories;
};

module.exports = { validateBody, newCategory, getCategories };