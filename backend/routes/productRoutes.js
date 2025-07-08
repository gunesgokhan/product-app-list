// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productsData = require('../data/products.json'); 
const { getGoldPricePerGramUSD } = require('../services/goldPriceService');
const { calculateProductPrice, convertPopularityToOutOf5 } = require('../utils/productUtils');

// Object'ten array'e dönüşüm fonksiyonu (images için)
const imagesObjectToArray = (imagesObj) => {
    return Object.values(imagesObj); // ["url1", "url2", "url3"]
};

router.get('/', async (req, res) => {
    try {
        const goldPrice = await getGoldPricePerGramUSD(); // Altın fiyatını çek

        const productsWithPrices = productsData.map((product, index) => {
            const calculatedPrice = calculateProductPrice(
                product.popularityScore,
                product.weight,
                goldPrice
            );

            const popularityOutOf5 = convertPopularityToOutOf5(product.popularityScore);

            return {
                id: index + 1,
                ...product,
                images: product.images, // burada array değil, obje kalmalı
                price: calculatedPrice,
                popularityOutOf5: popularityOutOf5,
                goldPriceUsed: goldPrice
        };

        } );

        // Filtreleme (isteğe bağlı)
        let filteredProducts = productsWithPrices;

        const { minPrice, maxPrice, minPopularity } = req.query;

        if (minPrice) {
            filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
        }
        if (maxPrice) {
            filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
        }
        if (minPopularity) {
            filteredProducts = filteredProducts.filter(p => p.popularityOutOf5 >= parseFloat(minPopularity));
        }

        res.json(filteredProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
});

module.exports = router;
