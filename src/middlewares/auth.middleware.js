const authService = require('../services/auth.service');

const validateToken = async (req, res, next) => {
    const { authorization } = req.headers;
    // const { data, code, message } = authService.validateToken(authorization);
    const result = authService.validateToken(authorization);

    if (result.code) {
        return res.status(result.code).json({ message: result.message });
    }

    req.user = result;

    next();
};

module.exports = { validateToken };