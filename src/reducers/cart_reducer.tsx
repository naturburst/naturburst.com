// src/reducers/cart_reducer.tsx
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'
import { initialStateType, cartType } from '../context/cart_context'

const cart_reducer = (
  state: initialStateType,
  action: { type: any; payload?: any }
) => {
  if (action.type === ADD_TO_CART) {
    const { id, slug, amount, singleProduct } = action.payload
    const tempItem = state.cart.find(item => item.id === id)

    // Debug the incoming product data
    console.log("Adding to cart - product data:", singleProduct);
    console.log("Product has prices?", singleProduct && singleProduct.prices ? "yes" : "no");

    if (tempItem) {
      // Item exists in cart, update amount
      const tempCart = state.cart.map(cartItem => {
        if (cartItem.id === id) {
          const newAmount = tempItem.amount + amount
          return { ...cartItem, amount: newAmount }
        } else {
          return cartItem
        }
      })

      return { ...state, cart: tempCart }
    } else {
      // Create a new cart item with full product reference for currency conversion
      const newItem: cartType = {
        id,
        slug,
        name: singleProduct.name,
        amount,
        image: singleProduct.images[0],
        price: singleProduct.price,
        // Store the complete prices object for currency conversion
        productReference: {
          prices: singleProduct.prices || undefined
        }
      }

      // Log the created cart item
      console.log("New cart item with price info:", newItem);

      return { ...state, cart: [...state.cart, newItem] }
    }
  }
  
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] }
  }
  
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter(
      cartItem => cartItem.id !== action.payload
    )
    return { ...state, cart: tempCart }
  }
  
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload
    const tempCart = state.cart.map(cartItem => {
      if (cartItem.id === id) {
        if (value === 'inc') {
          return { ...cartItem, amount: cartItem.amount + 1 }
        } else {
          let tempAmount = cartItem.amount - 1
          if (tempAmount < 1) {
            tempAmount = 1
          }
          return { ...cartItem, amount: tempAmount }
        }
      } else {
        return cartItem
      }
    })

    return { ...state, cart: tempCart }
  }
  
  if (action.type === COUNT_CART_TOTALS) {
    const { totalItems, totalAmount } = state.cart.reduce(
      (total, cartItem) => {
        const { price, amount } = cartItem

        total.totalItems += amount
        total.totalAmount += amount * price

        return total
      },
      { totalItems: 0, totalAmount: 0 }
    )
    return { ...state, totalItems, totalAmount }
  }
  
  // Handle the new action to update the currency-converted total
  if (action.type === 'UPDATE_CURRENCY_TOTAL') {
    return { 
      ...state, 
      totalInSelectedCurrency: action.payload 
    }
  }
  
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer