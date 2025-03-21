import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'
import { productDataType, sampleProducts } from '../utils/productData'

export type initialStateType = {
  isSidebarOpen: boolean
  allProducts: productDataType[] | []
  featuredProducts: productDataType[] | []
  singleProduct: productDataType | {}
  openSidebar: () => void
  closeSidebar: () => void
  fetchSingleProduct: (id: string) => void
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
  fetchSingleProduct: (id: string) => {},
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

  const fetchSingleProduct = (slug: string) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
    try {
      const singleProduct: productDataType = state.allProducts.filter(
        (product: productDataType) => product.slug === slug
      )[0]

      if (singleProduct) {
        dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct })
      } else {
        throw new Error('Product not found')
      }
    } catch (error) {
      console.log(error)
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    }
  }

  // Load products on initial mount
  useEffect(() => {
    dispatch({ type: GET_PRODUCTS_BEGIN })

    // Using sample product data directly since we have only 3 products
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: sampleProducts })

  }, [])

  return (
   <ProductsContext.Provider
     value={{
       ...state,
       openSidebar,
       closeSidebar,
       toggleSidebar, // Add this
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