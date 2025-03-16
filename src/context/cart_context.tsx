// src/context/cart_context.tsx
import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import { productDataType } from '../utils/productData'
import { useCurrencyContext, CurrencyCode } from './currency_context'
import { calculateTotalInCurrency } from '../utils/helpers'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

export type cartType = {
  id: string
  slug: string
  name: string
  amount: number
  image: string
  price: number
  productReference: {
    prices?: Record<CurrencyCode, number>
  }
}

export type initialStateType = {
  cart: cartType[]
  totalItems: number
  totalAmount: number
  totalInSelectedCurrency: number
  addToCart: (
    id: string | undefined,
    slug: string | undefined,
    amount: number,
    singleProduct: productDataType | {}
  ) => void
  removeItem: (id: string) => void
  toggleAmount: (id: string, value: string) => void
  clearCart: () => void
}

const getLocalStorage: () => [] | cartType[] = () => {
  let cart = localStorage.getItem('cart')
  if (cart) {
    return JSON.parse(cart)
  } else {
    return []
  }
}

const initialState = {
  cart: getLocalStorage(),
  totalItems: 0,
  totalAmount: 0,
  totalInSelectedCurrency: 0,
  addToCart: () => {},
  removeItem: () => {},
  toggleAmount: () => {},
  clearCart: () => {},
}

const CartContext = React.createContext<initialStateType>(initialState)

export const CartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { currency } = useCurrencyContext()

  const addToCart = (
    id: string | undefined,
    slug: string | undefined,
    amount: number,
    singleProduct: productDataType | {}
  ) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { id, slug, amount, singleProduct },
    })
  }

  const removeItem = (id: string) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id })
  }

  const toggleAmount = (id: string, value: string) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } })
  }

  const clearCart = () => {
    dispatch({ type: CLEAR_CART })
  }

  // Calculate total in selected currency whenever cart or currency changes
  useEffect(() => {
    const totalInSelectedCurrency = calculateTotalInCurrency(state.cart, currency)
    // Store in state for components to access
    dispatch({ 
      type: 'UPDATE_CURRENCY_TOTAL',
      payload: totalInSelectedCurrency 
    })
  }, [state.cart, currency])

  // When the cart changes, store the changes to localStorage + re-calculate total amount in cart
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
    dispatch({type: COUNT_CART_TOTALS})
  }, [state.cart])

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}