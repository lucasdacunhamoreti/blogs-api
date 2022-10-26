const { User } = require('../models');
const { validateNewUser } = require('../validations/validateUser');
const jwtUtil = require('../utils/jwt.util');

const validateBody = (body) => {
    const result = validateNewUser(body);
    return result;
};

const newUser = async ({ displayName, email, password, image }) => {
    const user = await User.findOne({
        where: {
            email,
        },
    });

    if (user) return { code: 409, message: 'User already registered' };
    
    const insertUser = await User.create({ displayName, email, password, image });

    const { password: _, ...userWithoutPassword } = insertUser;

    const token = jwtUtil.createToken(userWithoutPassword);

    return { code: null, token };
};

const getUsers = async () => {
    const users = await User.findAll({
       attributes: {
        exclude: ['password'],
       },
    });

    const result = users.map((item) => item.dataValues);
    return result;
};

const getUser = async (id) => {
    const user = await User.findByPk(id, {
        attributes: {
            exclude: ['password'],
        },
    });
    if (!user) return null;  

    return user.dataValues;
};

module.exports = { validateBody, newUser, getUsers, getUser };