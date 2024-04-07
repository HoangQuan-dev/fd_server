const mongoose = require('mongoose');
const Product = require('./products.model');

const Favorite = mongoose.model('favorite', {
    _id: String,
    userId: String,
    products: [Product]
});

module.exports = Favorite;