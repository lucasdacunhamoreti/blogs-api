const { User } = require('../models');
const { validateUser } = require('../validations/validateUser');
const jwtUtil = require('../utils/jwt.util');

const validateBody = (body) => {
    const result = validateUser(body);
    return result;
};

const validateLogin = async (email, password) => {
    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
        return { code: 400, message: 'Invalid fields' };
    }

    const { password: _, ...userWithoutPassword } = user.dataValues;

    const token = jwtUtil.createToken(userWithoutPassword);

    return { code: null, message: token };
};

const validateToken = (token) => {
    if (!token) {
        return { code: 401, message: 'Token not found' };
    }
    const user = jwtUtil.validateToken(token);
    // console.log(user, 'AAAAA');
    return user;
};

module.exports = { validateBody, validateLogin, validateToken };