import React, { useState } from 'react';

const PriceSelector = ({ onChange }) => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handleMinPriceChange = (event) => {
        const minValue = event.target.value;
        setMinPrice(minValue);
        onChange(minValue, maxPrice);
    };

    const handleMaxPriceChange = (event) => {
        const maxValue = event.target.value;
        setMaxPrice(maxValue);
        onChange(minPrice, maxValue);
    };

    return (
        <div className="price-selector">
            <div className="price-group">
                <label htmlFor="min-price">Prix minimum :</label>
                <input type="number" id="min-price" name="min-price" value={minPrice} onChange={handleMinPriceChange} />
            </div>
            <div className="price-group">
                <label htmlFor="max-price">Prix maximum :</label>
                <input type="number" id="max-price" name="max-price" value={maxPrice} onChange={handleMaxPriceChange} />
            </div>
        </div>
    );
};

export default PriceSelector;
