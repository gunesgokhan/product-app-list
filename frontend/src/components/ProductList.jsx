import React, { useRef } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';





function ProductList({ products, loading, error }) {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const container = scrollRef.current;
        const scrollAmount = 300; // Ne kadar kaydırılsın
        if (container) {
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (loading) {
        return (
            <div className="product-listing-page">
                <div className="loading-message">Ürünler yükleniyor...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-listing-page">
                <div className="error-message">Hata: {error}</div>
            </div>
        );
    }

    return (
        <div className="product-listing-page">
            <h1>Product List</h1>

            <div className="scroll-wrapper">
                <button className="scroll-button left" onClick={() => scroll('left')}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                
                <div className="horizontal-scroll-container" ref={scrollRef}>
                    {products.map(product => (
                        <ProductCard key={product.name} product={product} />
                    ))}
                </div>
                <button className="scroll-button right" onClick={() => scroll('right')}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
                
            </div>
        </div>
    );
}

export default ProductList;
