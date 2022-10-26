const User = (sequelize, Datatypes) => {
    const User = sequelize.define('User', {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true
        },
        displayName: Datatypes.STRING,
        email: Datatypes.STRING,
        password: Datatypes.STRING,
        image: Datatypes.STRING,
    }, {
        underscored: true,
        timestamps: false,
        tableName: 'users'
    });

    return User;
}

module.exports = User;