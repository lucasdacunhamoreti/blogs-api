const { BlogPost, Category, PostCategory } = require('../models');
const { validateNewPost } = require('../validations/validatePost');

const validateBody = (body) => {
    const result = validateNewPost(body);
    return result;
};

const newPost = async ({ title, content, categoryIds }, user) => {
    const verifiedCategories = categoryIds.map(async (categoryId) => {
        const verifyCategories = await Category.findByPk(categoryId);
        return verifyCategories;
    });
    const verified = await Promise.all(verifiedCategories);
    
    if (verified.some((category) => category === null)) {
        return { code: 400, erro: 'one or more "categoryIds" not found' };
    }

    const userId = user.id;

    const published = new Date();
    const updated = new Date();

    const { dataValues } = await BlogPost.create({ title, content, userId, published, updated });
    
    await categoryIds.forEach(async (category) => {
        await PostCategory.create({ postId: dataValues.id, categoryId: category });
    });

    return { code: 201, message: dataValues };
};

module.exports = { validateBody, newPost };