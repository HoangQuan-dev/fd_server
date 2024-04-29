const express = require('express');
const router = express.Router();

const productService = require('../../services/products/products.service');
const Products = require('../../models/products.model');

// GET: /products
router.get('/', async (req, res) => {
    const product = await productService.getAllProducts();
    res.send(product);
})

router.get('/:id', async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.send(product);
    } catch (error) {
        console.error('Error: ' + error);
        res.status(500).send('error');
    }
});

// POST: /products/add
router.post('/add', async (req, res) => {
    try {
        const product = await productService.createProduct(            
            req.body.name,            
            req.body.description,
            req.body.image,
            req.body.quantity,
            req.body.price,
            req.body.size,
            req.body.food_type,
            req.body.status
        );
        res.send(product);
    } catch (error) {
        console.error('Error: ' + error);
        res.status(500).send('error');
    }
});

// PUT: /products/"id"
router.put('/update/:id', async (req, res) => {
    try {
        const product = await productService.updateProduct(
            req.params.id,
            req.body.name,
            req.body.description,
            req.body.image,
            req.body.quantity,
            req.body.price,
            req.body.size,
            req.body.food_type,
            req.body.status
        );
        res.send(product.id);
    } catch (error) {
        console.error('Error: ' + error);
        res.status(500).send('error');
    }
});

module.exports = router;