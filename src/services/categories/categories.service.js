const Categories = require("../../models/categories.model")

async function getAllCategories() {
    const categories = await Categories.find();
    return categories;
}

async function getCategoryById(id) {
    const category = await Categories.findById(id);
    return category;
}

module.exports = {
    getAllCategories,
    getCategoryById,
};