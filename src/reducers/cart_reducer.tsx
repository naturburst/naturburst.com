// src/reducers/cart_reducer.tsx
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  SET_SHOPIFY_CHECKOUT,
  UPDATE_CART_FROM_SHOPIFY,
} from '../actions'
import { initialStateType, cartType } from '../context/cart_context'

const cart_reducer = (
  state: initialStateType,
  action: { type: any; payload?: any }
) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { id, variantId, slug, amount, singleProduct } = action.payload
      const tempItem = state.cart.find(item => item.id === id)

      if (tempItem) {
        // If the item is already in cart, update its amount
        const tempCart = state.cart.map(cartItem => {
          if (cartItem.id === id) {
            const newAmount = cartItem.amount + amount
            return { ...cartItem, amount: newAmount }
          } else {
            return cartItem
          }
        })

        return { ...state, cart: tempCart }
      } else {
        // Add new item to cart
        const newItem: cartType = {
          id,
          variantId, // Store the Shopify variant ID
          slug,
          name: singleProduct.name,
          amount,
          image: singleProduct.images[0],
          price: singleProduct.price,
        }
        return { ...state, cart: [...state.cart, newItem] }
      }
    }

    case REMOVE_CART_ITEM: {
      const tempCart = state.cart.filter(
        cartItem => cartItem.id !== action.payload
      )
      return { ...state, cart: tempCart }
    }

    case TOGGLE_CART_ITEM_AMOUNT: {
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

    case CLEAR_CART: {
      return { ...state, cart: [] }
    }

    case COUNT_CART_TOTALS: {
      // Calculate cart totals considering the total items and the price amounts
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

    case SET_SHOPIFY_CHECKOUT: {
      return { ...state, shopifyCheckout: action.payload }
    }

    case UPDATE_CART_FROM_SHOPIFY: {
      // Transform Shopify line items to our cart structure
      const shopifyLineItems = action.payload
      const transformedCart = shopifyLineItems.map((item: any) => ({
        id: item.id,
        variantId: item.variant.id,
        slug: item.variant.product.handle,
        name: item.title,
        amount: item.quantity,
        image: item.variant.image?.src || '',
        price: parseFloat(item.variant.price)
      }))

      return { ...state, cart: transformedCart }
    }

    default:
      throw new Error(`No Matching "${action.type}" - action type`)
  }
}

export default cart_reducer