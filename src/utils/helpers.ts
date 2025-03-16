// src/utils/helpers.ts
import { productDataType } from './productData'
import { CurrencyCode } from '../context/currency_context'

// Helper function to format prices with selected currency
export const formatPrice = (
  number: number,
  product?: productDataType | { prices?: Record<CurrencyCode, number> },
  currency: CurrencyCode = 'USD'
) => {
  // First check if we should use a currency-specific price
  if (product && product.prices && currency in product.prices) {
    // This directly accesses the price for the selected currency
    number = product.prices[currency as keyof typeof product.prices];
  }

  // Format according to locale conventions
  switch(currency) {
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
export const getPriceValue = (
  basePrice: number,
  product?: productDataType | { prices?: Record<CurrencyCode, number> },
  currency: CurrencyCode = 'USD'
): number => {
  if (product && product.prices && currency in product.prices) {
    return product.prices[currency as keyof typeof product.prices];
  }
  return basePrice;
}

// Helper to calculate totals from cart in correct currency
export const calculateTotalInCurrency = (
  cart: Array<{
    price: number,
    amount: number,
    productReference?: { prices?: Record<CurrencyCode, number> }
  }>,
  currency: CurrencyCode = 'USD'
): number => {
  return cart.reduce((total, item) => {
    // Get the correct price in the selected currency
    let priceInCurrency = item.price; // Default to the stored price

    if (item.productReference &&
        item.productReference.prices &&
        currency in item.productReference.prices) {
      // Use the currency-specific price if available
      priceInCurrency = item.productReference.prices[currency as keyof typeof item.productReference.prices];
    }

    return total + (priceInCurrency * item.amount);
  }, 0);
}