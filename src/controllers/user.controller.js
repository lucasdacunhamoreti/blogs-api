const userService = require('../services/user.service');

const newUser = async (req, res) => {
    const { value, error } = userService.validateBody(req.body);

    if (error) {
        return res.status(400).json({ message: error.message });
    }

    const { code, message, token } = await userService.newUser(value);

    if (code) {
        return res.status(code).json({ message });
    }
    return res.status(201).json({ token });
};

const getUsers = async (_req, res) => {
    const result = await userService.getUsers();
    return res.status(200).json(result);
};

const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await userService.getUser(id);

    if (!user) {
        return res.status(404).json({ message: 'User does not exist' });
    }
    return res.status(200).json(user);
};

module.exports = { newUser, getUsers, getUser };