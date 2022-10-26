const { Category } = require('../models');
const { validateNewCategory } = require('../validations/validateCategory');

const validateBody = (body) => {
    const result = validateNewCategory(body);
    return result;
};

const newCategory = ({ name }) => {
    const categoryInsert = Category.create({ name });
    return categoryInsert;
};

const getCategories = () => {
    const categories = Category.findAll();
    return categories;
};

module.exports = { validateBody, newCategory, getCategories };