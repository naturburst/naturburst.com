import React, { useContext } from 'react'

// Simplified to only support USD
export type CurrencyCode = 'USD';

type CurrencyContextType = {
  currency: CurrencyCode
}

// Default context setup with only USD support
const CurrencyContext = React.createContext<CurrencyContextType>({
  currency: 'USD'
})

export const CurrencyProvider: React.FC = ({ children }) => {
  // Always use USD as the currency
  const currency: CurrencyCode = 'USD';

  return (
    <CurrencyContext.Provider value={{ currency }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrencyContext = () => {
  return useContext(CurrencyContext)
}