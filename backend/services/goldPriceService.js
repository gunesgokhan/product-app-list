// backend/services/goldPriceService.js
//require('dotenv').config(); // .env dosyasını yükle
const axios = require('axios');

// Örnek bir altın fiyatı API'si URL'si ve anahtarı
// Kendi seçtiğiniz API'ye göre burayı güncelleyin!
const GOLD_API_BASE_URL = "https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument/XAU/USD"; // Ör: https://api.example.com/gold
//const GOLD_API_KEY = process.env.GOLD_API_KEY; // .env dosyasından okundu



async function getGoldPricePerGramUSD() {
    try {
        console.log('Fetching real-time gold price...');
        const response = await axios.get(GOLD_API_BASE_URL);
        
        const data = response.data;

        if (!Array.isArray(data) || data.length === 0) {
            throw new Error('API response is not in expected format');
        }

        const priceData = data[0];
        const primeSpread = priceData.spreadProfilePrices.find(p => p.spreadProfile === 'prime');

        if (!primeSpread || !primeSpread.ask) {
            throw new Error('Could not find prime ask price in API response');
        }

        const ouncePrice = primeSpread.ask;
        const gramPrice = ouncePrice / 31.1035;

        console.log(`Gold price per gram (USD): ${gramPrice.toFixed(2)}`);

        return gramPrice;
    } catch (error) {
        console.error('Error fetching gold price:', error.message);
        // Hata durumunda sabit bir değer döndürebilirsin istersen:
        // return 65;
        throw new Error('Could not fetch real-time gold price.');
    }
}

module.exports = { getGoldPricePerGramUSD };