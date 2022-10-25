const authService = require('../services/auth.service');

const login = async (req, res) => {
    const { value, error } = await authService.validateBody(req.body);

    const { email, password } = value;

    if (error) {
        return res.status(400).json({ message: error.message });
    }
    const { code, message } = await authService.validateLogin(email, password);
    
    if (code) {
        return res.status(code).json({ message });
    }
    return res.status(200).json({ token: message });
};

module.exports = { login };