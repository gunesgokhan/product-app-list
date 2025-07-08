// src/App.jsx
import React, { useState, useEffect } from 'react';
import { getProducts } from './services/productService';
import ProductList from './components/ProductList';
import './App.css';

function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        minPrice: null, // Başlangıçta filtre yok veya varsayılan değerler
        maxPrice: null,
        minPopularity: null,
    });

 
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                
                const data = await getProducts(filters); // Filtreli istek
                setProducts(data);
                setError(null);
            } catch (err) {
                setError('Ürünler yüklenirken bir hata oluştu: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [filters]); // 'filters' state'i değiştiğinde bu useEffect yeniden çalışır

    if (loading) {
        return <div className="loading">Ürünler yükleniyor...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    // Kullanıcının filtreleyebileceği button
    const handleApplyFilters = () => {
        
        setFilters({
            minPrice: 0,
            maxPrice: 800,
            minPopularity: 4.0
        });
        
    };



    const handleClearFilters = () => {
        // Filtreleri temizlemek için
        setFilters({
            minPrice: null,
            maxPrice: null,
            minPopularity: null,
        });
    };

    return (
    <div className="App">
        <header className="App-header">
            
            
        </header>
        <main>
            <ProductList products={products} />
        </main>
        
        <div className="filter-controls">

            <div className='filter-control-button'>

                
                {/* Bu buton tıklandığında, handleApplyFilters fonksiyonu tetiklenir */}
                
                <button onClick={handleApplyFilters}> Max $800 & Min 4 Stars</button>

                <p></p>

                {/* Bu buton tıklandığında, handleClearFilters fonksiyonu tetiklenir*/}
                {/* filters state'i güncellendiği için useEffect yeniden çalışır ve filtresiz tüm ürünleri getirir. */}
                <button onClick={handleClearFilters}>Delete Filter</button>
                </div>

            </div>


    </div>
);
}

export default App;