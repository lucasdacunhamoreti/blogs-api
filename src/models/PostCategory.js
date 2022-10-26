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
        tableName: 'categories'
    });

    PostCategory.associate = (models) => {
        models.BlogPost.belongsToMany(models.Category, {
            as: 'categories',
            foreignKey: 'post_id',
            otherKey: 'category_id',
            through: PostCategory,
        });

        models.Category.belongsToMany(models.BlogPost, {
            as: 'posts',
            foreignKey: 'category_id',
            otherKey: 'post_id',
            through: PostCategory,
        });
    }

    return PostCategory;
}

module.exports = PostCategory;