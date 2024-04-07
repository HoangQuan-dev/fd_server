const bcrypt = require('bcrypt');
const User = require("../../models/users.model");

async function getAllUsers() {
    const user = await User.find();
    return user;
}

async function getUserById(id) {
    const user = await User.findById(id);
    return user;
}

// encryp password
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

async function createUser(name, avatar, email, password, phone, address) {
    const hashedPassword = await hashPassword(password);

    const user = new User({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
    });

    await user.save();
    return user;
}

async function updateUser(id, name, email, password, phone, address) {
    const user = await User.findById(id);
    const hashedPassword = await hashPassword(password);

    user.name = name;
    user.email = email;
    user.password = hashedPassword;
    user.phone = phone;
    user.address = address;

    await user.save();
    return user;
}

module.exports = {
    getAllUsers,
    getUserById,
    hashPassword,
    createUser,
    updateUser,
};