import React, { useState } from 'react';

const ShoppingCart = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');

  const handleInputChange = (event) => {
    setItemName(event.target.value);
  };

  const handleAddItem = () => {
    setItems([...items, itemName]);
    setItemName('');
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <input type="text" value={itemName} onChange={handleInputChange} />
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
};

export default ShoppingCart; 