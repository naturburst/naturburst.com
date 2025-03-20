// src/context/currency_context.tsx
import React, { useContext, useState, useEffect } from 'react';

// Define supported currencies
export type CurrencyType = 'USD' | 'INR';

export type CurrencyContextType = {
  currency: CurrencyType;
  setCurrency: (currency: CurrencyType) => void;
};

// Changed default currency to INR
const defaultCurrency: CurrencyType = 'INR';

// Create the context with default values
const CurrencyContext = React.createContext<CurrencyContextType>({
  currency: defaultCurrency,
  setCurrency: () => {},
});

export const CurrencyProvider: React.FC = ({ children }) => {
  // Try to get saved currency from localStorage or use default
  const getSavedCurrency = (): CurrencyType => {
    const saved = localStorage.getItem('currency');
    return (saved === 'USD' || saved === 'INR') ? saved : defaultCurrency;
  };

  const [currency, setCurrency] = useState<CurrencyType>(getSavedCurrency());

  // Save currency to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrencyContext = () => {
  return useContext(CurrencyContext);
};