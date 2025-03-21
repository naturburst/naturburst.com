// src/context/cart_context.tsx
import React, { useEffect, useContext, useReducer, useState } from 'react'
import reducer from '../reducers/cart_reducer'
import { productDataType } from '../utils/productData'
import { useCurrencyContext } from './currency_context'
import { shopifyClient } from '../utils/shopify-config'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  SET_SHOPIFY_CHECKOUT,
  UPDATE_CART_FROM_SHOPIFY
} from '../actions'

// Extended cart item type with Shopify variant support
export type cartType = {
  id: string
  variantId?: string // Made optional for backward compatibility
  slug: string
  name: string
  amount: number
  image: string
  price: number
}

export type initialStateType = {
  cart: cartType[]
  totalItems: number
  totalAmount: number
  shopifyCheckout: any
  addToCart: (
    id: string | undefined,
    variantId: string | undefined,
    slug: string | undefined,
    amount: number,
    singleProduct: productDataType | {}
  ) => void
  removeItem: (id: string) => void
  toggleAmount: (id: string, value: string) => void
  clearCart: () => void
  checkout: () => void
}

const initialState = {
  cart: [],
  totalItems: 0,
  totalAmount: 0,
  shopifyCheckout: null,
  addToCart: () => {},
  removeItem: () => {},
  toggleAmount: () => {},
  clearCart: () => {},
  checkout: () => {}
}

const CartContext = React.createContext<initialStateType>(initialState)

export const CartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { currency } = useCurrencyContext()
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize Shopify checkout
  useEffect(() => {
    const initializeShopifyCheckout = async () => {
      try {
        let checkout;
        const checkoutId = localStorage.getItem('shopifyCheckoutId');

        if (checkoutId) {
          try {
            // Try to fetch existing checkout
            checkout = await shopifyClient.checkout.fetch(checkoutId);

            // Create new checkout if current one is completed
            if (checkout.completedAt) {
              checkout = await shopifyClient.checkout.create();
              localStorage.setItem('shopifyCheckoutId', checkout.id);
            }
          } catch (error) {
            // Create new checkout if fetch fails
            checkout = await shopifyClient.checkout.create();
            localStorage.setItem('shopifyCheckoutId', checkout.id);
          }
        } else {
          // Create new checkout if none exists
          checkout = await shopifyClient.checkout.create();
          localStorage.setItem('shopifyCheckoutId', checkout.id);
        }

        dispatch({ type: SET_SHOPIFY_CHECKOUT, payload: checkout });

        // Sync local cart with checkout items if any exist
        if (checkout.lineItems && checkout.lineItems.length > 0) {
          dispatch({ type: UPDATE_CART_FROM_SHOPIFY, payload: checkout.lineItems });
        }

        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing Shopify checkout:', error);
      }
    };

    initializeShopifyCheckout();
  }, []);

  // Add item to cart with Shopify integration
  const addToCart = async (
    id: string | undefined,
    variantId: string | undefined,
    slug: string | undefined,
    amount: number,
    singleProduct: productDataType | {}
  ) => {
    // Update local cart for immediate UI feedback
    dispatch({
      type: ADD_TO_CART,
      payload: { id, variantId, slug, amount, singleProduct },
    });

    // Sync with Shopify if checkout exists and we have a variantId
    if (state.shopifyCheckout && variantId) {
      try {
        // Find existing item in cart with same variant
        const lineItemId = state.cart.find((item: cartType) => item.variantId === variantId)?.id;

        let updatedCheckout;
        if (lineItemId) {
          // Update existing line item quantity
          const lineItemToUpdate = {
            id: lineItemId,
            quantity: amount,
            variantId
          };

          updatedCheckout = await shopifyClient.checkout.updateLineItems(
            state.shopifyCheckout.id,
            [lineItemToUpdate]
          );
        } else {
          // Add new line item
          const lineItemsToAdd = [{
            variantId,
            quantity: amount
          }];

          updatedCheckout = await shopifyClient.checkout.addLineItems(
            state.shopifyCheckout.id,
            lineItemsToAdd
          );
        }

        dispatch({ type: SET_SHOPIFY_CHECKOUT, payload: updatedCheckout });
      } catch (error) {
        console.error('Error updating Shopify checkout:', error);
      }
    }
  };

  // Remove item from cart
  const removeItem = async (id: string) => {
    // Find the item to remove
    const cartItem = state.cart.find((item: cartType) => item.id === id);

    // Update local state first for immediate feedback
    dispatch({ type: REMOVE_CART_ITEM, payload: id });

    // Sync with Shopify if possible
    if (state.shopifyCheckout && cartItem?.variantId) {
      try {
        // Find corresponding item in Shopify checkout
        const lineItem = state.shopifyCheckout.lineItems.find(
          (item: any) => item.variant.id === cartItem.variantId
        );

        if (lineItem) {
          const updatedCheckout = await shopifyClient.checkout.removeLineItems(
            state.shopifyCheckout.id,
            [lineItem.id]
          );

          dispatch({ type: SET_SHOPIFY_CHECKOUT, payload: updatedCheckout });
        }
      } catch (error) {
        console.error('Error removing item from Shopify checkout:', error);
      }
    }
  };

  // Update item quantity in cart
  const toggleAmount = async (id: string, value: string) => {
    // Update local state first
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });

    // Find the updated item
    const cartItem = state.cart.find((item: cartType) => item.id === id);

    // Sync with Shopify if possible
    if (state.shopifyCheckout && cartItem?.variantId) {
      try {
        // Find corresponding item in Shopify checkout
        const lineItem = state.shopifyCheckout.lineItems.find(
          (item: any) => item.variant.id === cartItem.variantId
        );

        if (lineItem) {
          // Calculate new quantity
          let newQuantity = cartItem.amount;
          if (value === 'inc') {
            newQuantity = cartItem.amount + 1;
          } else if (value === 'dec' && cartItem.amount > 1) {
            newQuantity = cartItem.amount - 1;
          }

          // Update quantity in Shopify checkout
          const updatedCheckout = await shopifyClient.checkout.updateLineItems(
            state.shopifyCheckout.id,
            [{
              id: lineItem.id,
              quantity: newQuantity
            }]
          );

          dispatch({ type: SET_SHOPIFY_CHECKOUT, payload: updatedCheckout });
        }
      } catch (error) {
        console.error('Error updating quantity in Shopify checkout:', error);
      }
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    dispatch({ type: CLEAR_CART });

    // Create new empty checkout in Shopify
    try {
      const newCheckout = await shopifyClient.checkout.create();
      localStorage.setItem('shopifyCheckoutId', newCheckout.id);

      dispatch({ type: SET_SHOPIFY_CHECKOUT, payload: newCheckout });
    } catch (error) {
      console.error('Error clearing Shopify checkout:', error);
    }
  };

  // Redirect to Shopify checkout
  const checkout = () => {
    if (state.shopifyCheckout?.webUrl) {
      window.location.href = state.shopifyCheckout.webUrl;
    }
  };

  // Update cart totals when cart changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('cart', JSON.stringify(state.cart));
      dispatch({ type: COUNT_CART_TOTALS });
    }
  }, [state.cart, isInitialized]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        toggleAmount,
        clearCart,
        checkout
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  return useContext(CartContext)
}