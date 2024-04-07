const mongoose = require('mongoose');

const Product = mongoose.model('products', {
    _id: String,
    name: String,
    description: String,
    image: String,
    quantity: Number,
    price: Number,
    size: [String],
    food_type: String,
    status: Boolean, // 1 : ACTIVE - 0 : INACTIVE
});

module.exports = Product;