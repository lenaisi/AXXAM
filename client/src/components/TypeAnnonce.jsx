import React, { useState } from 'react';

const TypeAnnonce = ({ onChange }) => {
    const [selectedType, setSelectedType] = useState('');

    const handleTypeSelect = (event) => {
        const selectedValue = event.target.value;
        setSelectedType(selectedValue);
        onChange(selectedValue); 
    };

    return (
        <div>            
            <select name="ad-type" id="ad-type" value={selectedType} onChange={handleTypeSelect}>
                <option value="">Type d'annonce</option>
                <option value="location">Location</option>
                <option value="vente">Vente</option>
            </select>
        </div>
    );
};

export default TypeAnnonce;

