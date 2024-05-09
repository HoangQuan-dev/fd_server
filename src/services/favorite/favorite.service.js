const Favorite = require('./favorite.model');

async function getListFavoriteByUserId(userId) {
    try {
        const favorites = await Favorite.find({ userId: userId });
        return favorites;
    } catch (error) {
        console.error('Error: ' + error);
        throw error;
    }
}

async function addToFavorite(userId, product) {
    try {
        const favorite = await Favorite.findOne({ userId: userId });
        if (favorite) {
            favorite.products.push(product);
            await favorite.save();
        } else {
            const newFavorite = new Favorite({
                userId: userId,
                products: [product]
            });
            await newFavorite.save();
        }
        return 'Product added to favorite';
    } catch (error) {
        console.error('Error: ' + error);
        throw error;
    }
}

module.exports = {
    getListFavoriteByUserId,
    addToFavorite
};