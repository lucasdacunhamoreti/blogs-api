const PostCategory = (sequelize, Datatypes) => {
    const PostCategory = sequelize.define('PostCategory', {
        postId: {
            primaryKey: true,
            type: Datatypes.INTEGER,
        },
        categoryId: {
            primaryKey: true,
            type: Datatypes.INTEGER,
        },
    }, {
        underscored: true,
        timestamps: false,
        tableName: 'posts_categories'
    });

    PostCategory.associate = (models) => {
        models.BlogPost.belongsToMany(models.Category, {
            as: 'categories',
            foreignKey: 'postId',
            otherKey: 'categoryId',
            through: PostCategory,
        });

        models.Category.belongsToMany(models.BlogPost, {
            as: 'posts',
            foreignKey: 'categoryId',
            otherKey: 'postId',
            through: PostCategory,
        });
    }

    return PostCategory;
}

module.exports = PostCategory;