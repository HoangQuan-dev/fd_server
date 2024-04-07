const mongoose = require('mongoose');
const User = require('./users.model');
const Product = require('./products.model');

const Order = mongoose.model('orders', {
    _id: String,
    user: User,
    address_delivery: String,
    products: [Product],
    total: Number,
    status: [String],
    createdAt: Number,
});
  
module.exports = Product;