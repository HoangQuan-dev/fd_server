const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Favorite = mongoose.model('favorite', {
    _id: String,
    userId: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

module.exports = Favorite;
