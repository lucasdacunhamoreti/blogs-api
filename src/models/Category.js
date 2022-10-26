const Category = (sequelize, Datatypes) => {
    const Category = sequelize.define('Category', {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true
        },
        name: Datatypes.STRING,
    }, {
        underscored: true,
        timestamps: false,
        tableName: 'categories'
    });

    return Category;
}

module.exports = Category;