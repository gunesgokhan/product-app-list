// backend/server.js
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes'); // Product router'ı import et

const app = express();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Product routes'u kullan
app.use('/api/products', productRoutes); // Tüm ürün istekleri buraya yönlendirilecek

// Basit bir test route'u (isteğe bağlı olarak bırakılabilir veya silinebilir)
app.get('/', (req, res) => {
    res.send('Backend API is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});