// Currency selector component placed in the navbar
import React from 'react';
import styled from 'styled-components';
import { useCurrencyContext, CurrencyType } from '../context/currency_context';
import { FaGlobe } from 'react-icons/fa';

const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrencyContext();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value as CurrencyType);
  };

  return (
    <Wrapper>
      <FaGlobe className="globe-icon" />
      <select value={currency} onChange={handleChange} aria-label="Select currency">
        <option value="USD">USD ($)</option>
        <option value="INR">INR (₹)</option>
      </select>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;

  .globe-icon {
    color: white;
    margin-right: 0.3rem;
    font-size: 0.9rem;
  }

  select {
    background: transparent;
    border: none;
    font-size: 0.85rem;
    font-weight: 600;
    color: white;
    cursor: pointer;
    padding-right: 1rem;
    appearance: none;

    &:focus {
      outline: none;
    }
  }

  /* Custom dropdown arrow */
  position: relative;
  &::after {
    content: "▼";
    font-size: 0.6rem;
    color: white;
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 992px) {
    margin-right: 0.5rem;
  }
`;

export default CurrencySelector;