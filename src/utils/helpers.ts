import { productDataType } from './productData'

// Supported currencies
export type CurrencyCode = 'USD' | 'INR' | 'GBP' | 'EUR';

// Currency detection based on browser locale
export const getUserCurrency = (): CurrencyCode => {
  const locale = navigator.language || 'en-US';

  if (locale.includes('en-GB')) return 'GBP';
  if (locale.includes('en-IN') || locale.includes('hi')) return 'INR';
  if (locale.includes('fr') || locale.includes('de') || locale.includes('es') ||
      locale.includes('it') || locale.includes('nl')) return 'EUR';

  return 'USD'; // Default
}

// Format price based on location
export const formatPrice = (number: number, product?: productDataType) => {
  const currency = getUserCurrency();

  // Use location-specific pricing when available
  if (product?.prices?.[currency]) {
    number = product.prices[currency];
  }

  // Format according to locale conventions
  switch(currency) {
    case 'INR':
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
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