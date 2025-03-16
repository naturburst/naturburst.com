// src/utils/helpers.ts
import { productDataType } from './productData'
import { CurrencyCode } from '../context/currency_context'

// Helper function to format prices with selected currency
export const formatPrice = (
  number: number,
  product?: productDataType | { prices?: Record<CurrencyCode, number> },
  currency: CurrencyCode = 'USD'
) => {
  // Debug logs
  console.log(`Format price called with currency: ${currency}`);
  console.log(`Base price: ${number}`);

  // Check if we have product data with currency-specific pricing
  if (product && product.prices && currency in product.prices) {
    const currencyPrice = product.prices[currency];
    console.log(`Found currency-specific price (${currency}): ${currencyPrice}`);
    number = currencyPrice;
  } else {
    console.log(`No currency-specific price found for ${currency}, using default: ${number}`);
  }

  // Format according to locale conventions
  let formattedValue;
  switch(currency) {
    case 'INR':
      formattedValue = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
      }).format(number);
      break;
    case 'GBP':
      formattedValue = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
      }).format(number);
      break;
    case 'EUR':
      formattedValue = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
      }).format(number);
      break;
    case 'USD':
    default:
      formattedValue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(number);
  }

  console.log(`Formatted price: ${formattedValue}`);
  return formattedValue;
}

// Function to get price value in a specific currency (without formatting)
export const getPriceValue = (
  basePrice: number,
  product?: productDataType | { prices?: Record<CurrencyCode, number> },
  currency: CurrencyCode = 'USD'
): number => {
  if (product && product.prices && currency in product.prices) {
    console.log(`Getting price value for ${currency}: ${product.prices[currency]}`);
    return product.prices[currency];
  }
  console.log(`No specific price for ${currency}, using base price: ${basePrice}`);
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
  console.log(`Calculating total in ${currency} for ${cart.length} items`);

  return cart.reduce((total, item) => {
    // Get the correct price in the selected currency
    let priceInCurrency = item.price; // Default to the stored price

    if (item.productReference &&
        item.productReference.prices &&
        currency in item.productReference.prices) {
      // Use the currency-specific price if available
      priceInCurrency = item.productReference.prices[currency];
      console.log(`Item uses currency-specific price: ${priceInCurrency} ${currency}`);
    } else {
      console.log(`Item uses default price: ${priceInCurrency}`);
    }

    const itemTotal = priceInCurrency * item.amount;
    console.log(`Item subtotal: ${itemTotal} ${currency}`);
    return total + itemTotal;
  }, 0);
}