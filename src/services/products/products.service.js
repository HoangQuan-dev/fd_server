const Product = require('../../models/products.model');

const msg = 'success';

async function getAllProducts() {
    const product = await Product.find();
    return product;
}

async function getProductById(id) {
    const product = await Product.findById(id);
    return product;
}


async function createProduct(name, description, image, quantity, price, size, food_type, status) {
    const product = new Product({
        name, description, image, quantity, price, size, food_type, status
    })

    await product.save();
    return msg;
}

async function updateProduct(id, name, description, image, quantity, price, size, food_type, status) {
    const product = await Product.findById(id);

    product.name = name;
    product.description = description;
    product.image = image;
    product.quantity = quantity;
    product.price = price;
    product.size = size;
    product.food_type = food_type;
    product.status = status;

    await product.save();
    return msg;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
}