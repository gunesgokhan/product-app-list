// src/services/productService.js
import axios from 'axios';
const API_BASE_URL = 'https://product-app-h6ik.onrender.com/';

export const getProducts = async (filters = {}) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products`, {
            params: filters // Filtreleri sorgu parametresi olarak gönder
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error; // Hata fırlatır
    }
};
