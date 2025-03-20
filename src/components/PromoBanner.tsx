// src/components/PromoBanner.tsx
import React from 'react';
import styled from 'styled-components';
import { useCurrencyContext } from '../context/currency_context';

// Define free shipping thresholds for each currency
const SHIPPING_THRESHOLDS = {
  USD: 25, // $25 free shipping
  INR: 500 // ₹500 free shipping
};

const PromoBanner = () => {
  const { currency } = useCurrencyContext();

  // Get the appropriate threshold based on currency
  const threshold = SHIPPING_THRESHOLDS[currency];

  // Format the threshold message based on currency
  const thresholdText = currency === 'USD'
    ? `$${threshold}`
    : `₹${threshold}`;

  return (
    <Wrapper>
      <span>FREE SHIPPING ON ORDERS ABOVE {thresholdText}</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background: #1a2e37;
  color: white;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 1px;
  padding: 0.25rem 0;

  span {
    display: inline-block;
  }

  @media (max-width: 380px) {
    font-size: 0.7rem;
  }
`;

export default PromoBanner;