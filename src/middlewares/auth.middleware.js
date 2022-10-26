const authService = require('../services/auth.service');

const validateToken = async (req, res, next) => {
    const { authorization } = req.headers;
    const { user, code, message } = authService.validateToken(authorization);
    if (code) {
        return res.status(code).json({ message });
    }
    req.user = user;

    next();
};

module.exports = { validateToken };