const mongoose = require('mongoose');

const User = mongoose.model('users', {
    name: String,
    email: String,
    password: String,
    phone: String,
    address: String,
    avatar: String,
    provider: String,
    us_authorities: [String],
    createdAt: Number,
});

module.exports = User;