import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRID_VIEW,
  SET_LIST_VIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
} from '../actions'
import { useProductsContext } from './products_context'
import { productDataType } from '../utils/productData'

export type initialStateType = {
  filteredProducts: productDataType[]
  allProducts: productDataType[]
  gridView: boolean
  setGridView: () => void
  setListView: () => void
  sort: string
  updateSort: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const initialState: initialStateType = {
  filteredProducts: [],
  allProducts: [],
  gridView: true,
  setGridView: () => {},
  setListView: () => {},
  sort: 'price-lowest',
  updateSort: () => {},
}

const FilterContext = React.createContext<initialStateType>(initialState)

export const FilterProvider: React.FC = ({ children }) => {
  const { allProducts } = useProductsContext()
  const [state, dispatch] = useReducer(reducer, initialState)

  // Load all products when they change
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: allProducts })
  }, [allProducts])

  // Update sorting when sort option changes
  useEffect(() => {
    dispatch({ type: SORT_PRODUCTS })
  }, [allProducts, state.sort])

  // View setting functions
  const setGridView = () => {
    dispatch({ type: SET_GRID_VIEW })
  }

  const setListView = () => {
    dispatch({ type: SET_LIST_VIEW })
  }

  // Sort handling
  const updateSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: UPDATE_SORT, payload: e.target.value })
  }

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => {
  return useContext(FilterContext)
}