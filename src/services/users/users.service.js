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

async function createUser(name, gender, birthDay, email, phone, password, address, avatar) {
    const hashedPassword = await hashPassword(password);

    const user = new User({
        name,
        gender,
        birthDay,
        email,
        phone,
        password: hashedPassword,
        address,
        avatar
    });

    await user.save();
    return user;
}

async function updateUser(id, name, gender, birthDay, email, phone, password, address, avatar) {
    const user = await User.findById(id);
    const hashedPassword = await hashPassword(password);

    user.name = name;
    user.gender = gender;
    user.birthDay = birthDay;
    user.email = email;
    user.phone = phone;
    user.password = hashedPassword;
    user.address = address;
    user.avatar = avatar;

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