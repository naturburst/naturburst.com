// Define the currency type locally since we're only supporting USD
type CurrencyCode = 'USD';

// Helper function to format prices with USD only
export const formatPrice = (
  number: number,
  product?: any, // We won't need to use this parameter anymore
  currency: CurrencyCode = 'USD'
) => {
  // Always format as USD
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number);
}

// Helper to calculate totals from cart - simplified for USD only
export const calculateTotalInCurrency = (
  cart: Array<{
    price: number,
    amount: number
  }>,
  currency: CurrencyCode = 'USD'
): number => {
  return cart.reduce((total, item) => {
    const itemTotal = item.price * item.amount;
    return total + itemTotal;
  }, 0);
}