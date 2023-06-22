import React from 'react';
import { useState, useEffect } from 'react';
import ProductListItem from "../ProductListItem";
import ProductDetails from "../ProductDetails";
import './ProductView.css'

function ProductView({ products }) {

  const [sideOpen, setSideOpen] = useState(localStorage.getItem('sideOpen') || true);
  const [selectedProduct, setSelectedProduct] = useState('');

  useEffect(() => {
    if (selectedProduct.id) {
      setSideOpen(true);
    }
  }, [selectedProduct]);

  useEffect(() => {
    localStorage.setItem('sideOpen', sideOpen);
    if (!sideOpen) {
      setSelectedProduct('');
    }
  }, [sideOpen]);

  return (
    <div className="product-view">
      <div className="product-main-area">
        <h1>Products</h1>
        <div className="product-list">
          {products.map(item =>
            <ProductListItem
              key={item.id}
              product={item}
              isSelected={item.id === selectedProduct.id || false}
              onClick={() => setSelectedProduct(item)} />
          )}
        </div>
      </div>
      <div className="product-side-panel">
        <div className="product-side-panel-toggle-wrapper">
          <div className="product-side-panel-toggle"
               onClick={() => setSideOpen(!sideOpen)}>
            {sideOpen ? '>' : '<'}
          </div>
        </div>
        <ProductDetails visible={sideOpen} product={selectedProduct}/>
      </div>
    </div>
  );
}

export default ProductView;
