// src/utils/helpers.ts
import { CurrencyType } from '../context/currency_context';

// Exchange rates from USD to other currencies
export const EXCHANGE_RATES = {
  USD: 1,
  INR: 40 // 1 USD = 50 INR (approximate)
};

// Discount percentage for each currency
export const DISCOUNT_RATES = {
  USD: 0.8, // 20% discount
  INR: 0.7  // 30% discount
};

// Original price formatting
export const formatOriginalPrice = (number: number, currency: CurrencyType = 'USD') => {
  // Convert price from USD to target currency
  const convertedPrice = number * EXCHANGE_RATES[currency];

  return new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'en-IN', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: currency === 'USD' ? 2 : 0,
  }).format(convertedPrice);
};

// Discounted price formatting
export const formatDiscountedPrice = (number: number, currency: CurrencyType = 'USD') => {
  // Convert price from USD to target currency
  const convertedPrice = number * EXCHANGE_RATES[currency];
  // Apply discount
  const discountedPrice = convertedPrice * DISCOUNT_RATES[currency];

  return new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'en-IN', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: currency === 'USD' ? 2 : 0,
  }).format(discountedPrice);
};

// Combined price formatter - returns both original and discounted prices
export const formatPrice = (number: number, currency: CurrencyType = 'USD') => {
  if (number === undefined || number === null) {
    return { originalPrice: '', discountedPrice: '' };
  }

  return {
    originalPrice: formatOriginalPrice(number, currency),
    discountedPrice: formatDiscountedPrice(number, currency)
  };
};