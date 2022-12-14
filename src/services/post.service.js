const Sequelize = require('sequelize');
const { BlogPost, Category, PostCategory, User } = require('../models');
const { validateNewPost, validateUpdatePost } = require('../validations/validatePost');

const { Op } = Sequelize; 

const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const validateBodyCreatePost = (body) => {
    const result = validateNewPost(body);
    return result;
};

const validateBodyUpdatePost = (body) => {
    const result = validateUpdatePost(body);
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
    const posts = await BlogPost.findAll({
        include: [
            { model: User, as: 'user', where: { id }, attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories', through: { attributes: [] } },
        ],
    });
    return posts;
};

const getPostById = async (user, id) => {
    const post = await BlogPost.findByPk(id, {
        include: [
            { 
                model: User,
                as: 'user',
                where: { id: user.id },
                attributes: { exclude: ['password'] },
            },
            { model: Category, as: 'categories', through: { attributes: [] } },
        ],
    });

    return post;
};

const updatePost = async ({ title, content }, id, user) => {
    const { dataValues } = await BlogPost.findOne({
        where: { id }, attributes: ['userId'],
    });
    if (!dataValues) return { code: 404, erro: 'Post not exist' };
    if (user.id !== dataValues.userId) {
        return { code: 401, erro: 'Unauthorized user' };
    }

    await BlogPost
    .update({ title, content, updated: new Date() }, { where: { id } });
    
    const blogUpdated = await BlogPost.findByPk(id, {
        include: [{ 
            model: User,
            as: 'user',
            where: { id: user.id },
            attributes: { exclude: ['password'] },
        }, { model: Category, as: 'categories', through: { attributes: [] } }],
    });
    return { code: 200, message: blogUpdated };
};

const deletePost = async (user, id) => {
    const getPost = await BlogPost.findOne({
        where: { id }, attributes: ['userId'],
    });
    if (!getPost) return { code: 404, erro: 'Post does not exist' };

    if (user.id !== getPost.dataValues.userId) {
        return { code: 401, erro: 'Unauthorized user' };
    }

    await BlogPost.destroy({
        where: { id },
    });

    return { code: 204, message: '' };
};

const getAllPostsByQuery = async (where, query, userId) => {
    const result = await BlogPost.findAll(
        {
            where: { [where]: { [Op.like]: query } },
            include: [
                { 
                    model: User,
                    as: 'user',
                    where: { id: userId },
                    attributes: { exclude: ['password'] },
                },
                { model: Category, as: 'categories', through: { attributes: [] } },
            ],
        },
    );
    return result;
};

const getPostsWithoutQuery = async (userId) => {
    const allPosts = await BlogPost.findAll({
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
    return allPosts;
};

const getPostsByQuery = async (query, user) => {
    const querySearch = query.length ? `%${query}%` : null;

    const searchByTitle = await getAllPostsByQuery('title', querySearch, user.id);
    const searchByContent = await getAllPostsByQuery('content', querySearch, user.id);

    if (searchByTitle.length) {
        return searchByTitle;
    } 
    if (searchByContent.length) {
        return searchByContent;
    } 
    if (!query) {
        const searchWithoutQuery = await getPostsWithoutQuery(user.id);
        return searchWithoutQuery;
    }
    return [];
};

module.exports = { 
    validateBodyCreatePost,
    newPost,
    getPosts,
    getPostById,
    validateBodyUpdatePost,
    updatePost,
    deletePost,
    getPostsByQuery,
};