// Tạo model Order
const mongoose = require('mongoose');

const Order = mongoose.model('Order', {
    orderId: String,
    amount: Number,
    orderInfo: String,
    createDate: String,
    bankCode: String
});

module.exports = Order;
