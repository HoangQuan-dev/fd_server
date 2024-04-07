const { default: mongoose } = require("mongoose");

const Categories = mongoose.model('categories', {
    _id: String,
    name: String,
    url: String,
});

module.exports = Categories;