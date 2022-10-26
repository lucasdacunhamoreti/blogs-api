const Sequelize = require('sequelize');
const { BlogPost, Category, PostCategory, User } = require('../models');
const { validateNewPost } = require('../validations/validatePost');

const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const validateBody = (body) => {
    const result = validateNewPost(body);
    return result;
};

const verifyCategoryId = async (categoryIds) => {
    const verifiedCategories = await Promise.all(categoryIds.map(async (categoryId) => {
        const verifyCategories = await Category.findByPk(categoryId);
        return verifyCategories;
    }));
    if (verifiedCategories.some((category) => category === null)) {
        return false;
    }
    return true;
};

const newPost = async ({ title, content, categoryIds }, { id }) => {
    const verificationCategoryId = await verifyCategoryId(categoryIds);
    if (!verificationCategoryId) return { code: 400, erro: 'one or more "categoryIds" not found' };
    try {
        const result = await sequelize.transaction(async (t) => {
            const post = await BlogPost.create({ 
                title, content, userId: id, published: new Date(), updated: new Date(),
            }, { transaction: t });
 
            await Promise.all(categoryIds.map((category) => PostCategory
            .create({ postId: post.dataValues.id, categoryId: category }, { transaction: t })));

            return post.dataValues;
        });
        return { code: 201, message: result };
    } catch (error) {
        return { code: 400, erro: error.parent.sqlMessage };
    }
};

const getPosts = async ({ id }) => {
    const post = await BlogPost.findAll({
        where: {
            id,
        },
        include: [
            { model: User, as: 'user', where: { id }, attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories', through: { attributes: [] } },
        ],
    });
    return post;
};

const getPostById = async (user, id) => {
    const userId = user.id;
    const post = await BlogPost.findOne({
        where: {
            id,
        },
        include: [
            { 
                model: User,
                as: 'user',
                where: { id: userId },
                attributes: { exclude: ['password'] },
            },
            { model: Category, as: 'categories', through: { attributes: [] } },
        ],
    });

    return post;
};

module.exports = { validateBody, newPost, getPosts, getPostById };