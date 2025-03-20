import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ProductsProvider } from './context/products_context';
import { FilterProvider } from './context/filter_context';
import { CartProvider } from './context/cart_context';
import { CurrencyProvider } from './context/currency_context';

ReactDOM.render(
  <React.StrictMode>
    <CurrencyProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </CurrencyProvider>
  </React.StrictMode>,
  document.getElementById('root')
);