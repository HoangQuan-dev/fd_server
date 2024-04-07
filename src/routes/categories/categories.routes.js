const express = require('express');
const router = express.Router();

const categoriesService = require('../../services/categories/categories.service');

router.get('/', async (req, res) => {
    try {
        const categories = await categoriesService.getAllCategories();
        res.send(categories);
    } catch (error) {
        console.error('Error: ' + error);
        res.status(500).send('error');
    }
    
})

router.get('/:id', async (req, res) => {
    try {
        const category = await categoriesService.getCategoryById(req.params.id);
        res.send(category);
    } catch (error) {
        console.error('Error: ' + error);
        res.status(500).send('error');
    }
});

module.exports = router;
