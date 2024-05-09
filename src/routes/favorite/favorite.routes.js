const express = require('express');
const router = express.Router();
const favoriteService = require('../../services/favorite/favorite.service');

router.get('/:userId', async (req, res) => {
    try {
        const favorites = await favoriteService.findListFavoriteByUserId(req.params.userId);
        res.json(favorites);
    } catch (error) {
        console.error('Error: ' + error);
        res.status(500).send('error');
    }
});

router.post('/add', async (req, res) => {
    try {
        const message = await favoriteService.addToFavorite(
            req.body.userId,
            req.body.product
        );
        res.send(message);
    } catch (error) {
        console.error('Error: ' + error);
        res.status(500).send('error');
    }
});

module.exports = router;
