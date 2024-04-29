const mongoose = require('mongoose');

const Product = mongoose.model('products', {
    // _id: String,
    name: String,
    description: String,
    image: String,
    quantity: Number,
    price: Number,
    size: [String],
    cat_id: String,
    status: Boolean, // 1 : ACTIVE - 0 : INACTIVE
});

module.exports = Product;