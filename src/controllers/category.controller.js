const categoryService = require('../services/category.service');

const newCategory = async (req, res) => {
    const { error } = categoryService.validateBody(req.body);

    if (error) {
        return res.status(400).json({ message: error.message });
    }

    const result = await categoryService.newCategory(req.body);
    return res.status(201).json(result);
};

const getCategories = async (req, res) => {
    const result = await categoryService.getCategories();
    return res.status(200).json(result);
};

module.exports = { newCategory, getCategories };