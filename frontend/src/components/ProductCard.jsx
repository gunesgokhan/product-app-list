import React, { useState } from 'react';
import './ProductCard.css';

function ProductCard({ product }) {
  const colorKeys = Object.keys(product.images);
  const [selectedColor, setSelectedColor] = useState(colorKeys[0]);
  const [displayImage, setDisplayImage] = useState(product.images[selectedColor]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setDisplayImage(product.images[color]);
  };

  // Yıldız hesaplama
  const totalStars = 5;
  const rating = product.popularityScore * 5;
  const filledStars = Math.floor(rating);

  const colorMap = {
  yellow: '#E6CA97',
  white: '#D9D9D9',
  rose: '#E1A4A9'
};

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={displayImage}
          alt={`${product.name} - ${selectedColor}`}
          className="product-image"
        />
      </div>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price.toFixed(2)} USD</p>

      {/* ⭐ Popülerlik: Yıldızlarla gösterim */}
      <div className="product-rating">
        {[...Array(totalStars)].map((_, index) => (
          <span key={index} className={index < filledStars ? 'star filled' : 'star'}>★</span>
        ))}
        <span className="numeric-rating">{rating.toFixed(1)}/5</span>
      </div>

      <div className="color-picker">
        {colorKeys.map((color) => (
          <div
            key={color}
            className={`color-option ${selectedColor === color ? 'selected' : ''}`}
            style={{
              backgroundColor: colorMap[color] || '#ccc' , // color rengi ornek
                  }}

            
          
            onClick={() => handleColorChange(color)}
            title={color}
          ></div>
        ))}
      </div>

      <p className="selected-color-label">
        {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)} Gold
      </p>
    </div>
  );
}

export default ProductCard;
