import { productDataType } from './productData'
import { CurrencyCode } from '../context/currency_context'

// Helper function to format prices with selected currency
export const formatPrice = (number: number, product?: productDataType, currency?: CurrencyCode) => {
  // If no currency is provided, use USD as default
  const currencyToUse = currency || 'USD';

  // Use currency-specific pricing when available in the product data
  if (product?.prices?.[currencyToUse]) {
    number = product.prices[currencyToUse];
  }

  // Format according to locale conventions
  switch(currencyToUse) {
    case 'INR':
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
      }).format(number);

    case 'GBP':
      return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
      }).format(number);

    case 'EUR':
      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
      }).format(number);

    case 'USD':
    default:
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(number);
  }
}

// Function to get price value in a specific currency (without formatting)
export const getPriceValue = (basePrice: number, product?: productDataType, currency?: CurrencyCode): number => {
  const currencyToUse = currency || 'USD';

  if (product?.prices?.[currencyToUse]) {
    return product.prices[currencyToUse];
  }

  return basePrice;
}