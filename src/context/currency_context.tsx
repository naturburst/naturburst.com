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
    console.log('Currency updated to:', currency) // Debug log
  }, [currency])

  // Create an explicit state setter function
  const updateCurrency = (newCurrency: CurrencyCode) => {
    console.log('Setting currency to:', newCurrency) // Debug log
    if (newCurrency !== currency) {
      setCurrency(newCurrency)
    }
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: updateCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrencyContext = () => {
  return useContext(CurrencyContext)
}