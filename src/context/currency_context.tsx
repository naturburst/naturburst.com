import React, { useContext, useState, useEffect } from 'react'

// Supported currency types
export type CurrencyCode = 'USD' | 'INR' | 'GBP' | 'EUR';

type CurrencyContextType = {
  currency: CurrencyCode
  setCurrency: (currency: CurrencyCode) => void
}

// Default context setup
const CurrencyContext = React.createContext<CurrencyContextType>({
  currency: 'USD',
  setCurrency: () => {}
})

// Get initial currency from localStorage or fallback to USD
const getInitialCurrency = (): CurrencyCode => {
  const savedCurrency = localStorage.getItem('selectedCurrency')
  return (savedCurrency as CurrencyCode) || 'USD'
}

export const CurrencyProvider: React.FC = ({ children }) => {
  const [currency, setCurrency] = useState<CurrencyCode>(getInitialCurrency())

  // Save currency preference when it changes
  useEffect(() => {
    localStorage.setItem('selectedCurrency', currency)
  }, [currency])

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrencyContext = () => {
  return useContext(CurrencyContext)
}