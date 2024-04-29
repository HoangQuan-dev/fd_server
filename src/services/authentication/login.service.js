const bcrypt = require('bcrypt');
const User = require('../../models/users.model');

async function loginUser(emailOrPhone, password) {
    const user = await User.findOne({
        $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
    });

    if (!user) {
        throw new Error('User not found');
    }

    const validPassword = bcrypt.compare(password, user.password);
    if (!validPassword) {
        throw new Error('Invalid password');
    }

    return user;
}

module.exports = loginUser;