const mongoose = require('mongoose');

const User = mongoose.model('users', {
    name: String,
    gender: String,
    email: String,
    phone: String,
    password: String,
    address: String,
    avatar: String,
    provider: String,
    us_authorities: [String],
    createdAt: Number,
    status: Boolean,
});

module.exports = User;