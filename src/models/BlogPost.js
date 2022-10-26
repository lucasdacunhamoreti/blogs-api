const BlogPost = (sequelize, Datatypes) => {
    const BlogPost = sequelize.define('BlogPost', {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true
        },
        title: Datatypes.STRING,
        content: Datatypes.STRING,
        userId: Datatypes.INTEGER,
        published: Datatypes.DATE,
        updated: Datatypes.DATE
    }, {
        underscored: true,
        timestamps: false,
        tableName: 'categories'
    });

    BlogPost.associate = (models) => {
        BlogPost.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });
    }

    return BlogPost;
}

module.exports = BlogPost;