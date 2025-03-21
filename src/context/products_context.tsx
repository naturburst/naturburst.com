// src/context/products_context.tsx
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'
import { productDataType, sampleProducts } from '../utils/productData'
import { shopifyClient, transformShopifyProduct, debugFetchProducts } from '../utils/shopify-config'

export type initialStateType = {
  isSidebarOpen: boolean
  allProducts: productDataType[] | []
  featuredProducts: productDataType[] | []
  singleProduct: productDataType | {}
  openSidebar: () => void
  closeSidebar: () => void
  toggleSidebar: () => void
  fetchSingleProduct: (handle: string) => void
  productsLoading: boolean
  productsError: boolean
  singleProductLoading: boolean
  singleProductError: boolean
}

const initialState: initialStateType = {
  isSidebarOpen: false,
  allProducts: [],
  featuredProducts: [],
  singleProduct: {},
  openSidebar: () => {},
  closeSidebar: () => {},
  toggleSidebar: () => {},
  fetchSingleProduct: (handle: string) => {},
  productsLoading: false,
  productsError: false,
  singleProductLoading: false,
  singleProductError: false,
}

const ProductsContext = React.createContext<initialStateType>(initialState)

export const ProductsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  const toggleSidebar = () => {
    dispatch({ type: state.isSidebarOpen ? SIDEBAR_CLOSE : SIDEBAR_OPEN });
  }

  // Fetch all products from Shopify with fallback to sample data
  const fetchProducts = async () => {
    dispatch({ type: GET_PRODUCTS_BEGIN })
    try {
      // First try to fetch from Shopify
      const products = await shopifyClient.product.fetchAll(250);
      console.log(`Retrieved ${products.length} products from Shopify`);

      if (products && products.length > 0) {
        // Transform Shopify products to our app's product structure
        const transformedProducts = products.map(transformShopifyProduct);

        dispatch({
          type: GET_PRODUCTS_SUCCESS,
          payload: transformedProducts
        });
      } else {
        console.warn('No products found in Shopify store, using sample products');
        // Fallback to sample products if none found
        dispatch({
          type: GET_PRODUCTS_SUCCESS,
          payload: sampleProducts
        });
      }
    } catch (error) {
      console.error('Error fetching products from Shopify:', error);
      console.warn('Using sample products due to Shopify fetch error');

      // Fallback to sample products on error
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: sampleProducts
      });
    }
  }

  // Fetch a single product by handle (Shopify's term for slug)
  const fetchSingleProduct = async (handle: string) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
    try {
      // First try to find the product in allProducts to avoid unnecessary API calls
      const productInState = state.allProducts.find(
        (product: productDataType) => product.slug === handle
      )

      if (productInState) {
        dispatch({
          type: GET_SINGLE_PRODUCT_SUCCESS,
          payload: productInState
        })
      } else {
        try {
          // If not found in state, fetch from Shopify
          const product = await shopifyClient.product.fetchByHandle(handle);

          if (product) {
            const transformedProduct = transformShopifyProduct(product);
            dispatch({
              type: GET_SINGLE_PRODUCT_SUCCESS,
              payload: transformedProduct
            })
          } else {
            // If not found in Shopify, check sample products
            const sampleProduct = sampleProducts.find(p => p.slug === handle);
            if (sampleProduct) {
              dispatch({
                type: GET_SINGLE_PRODUCT_SUCCESS,
                payload: sampleProduct
              });
            } else {
              throw new Error('Product not found');
            }
          }
        } catch (shopifyError) {
          console.error('Error fetching from Shopify, trying sample data:', shopifyError);

          // Try to find in sample products
          const sampleProduct = sampleProducts.find(p => p.slug === handle);
          if (sampleProduct) {
            dispatch({
              type: GET_SINGLE_PRODUCT_SUCCESS,
              payload: sampleProduct
            });
          } else {
            throw new Error('Product not found in Shopify or sample data');
          }
        }
      }
    } catch (error) {
      console.error('Error fetching single product:', error)
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    }
  }

  // Load products on initial mount
  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        toggleSidebar,
        fetchSingleProduct
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export const useProductsContext = () => {
  return useContext(ProductsContext)
}