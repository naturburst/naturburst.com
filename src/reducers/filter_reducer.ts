import {
  LOAD_PRODUCTS,
  SET_LIST_VIEW,
  SET_GRID_VIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
} from '../actions'
import { initialStateType } from '../context/filter_context'

const filter_reducer = (
  state: initialStateType,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return {
        ...state,
        allProducts: [...action.payload],
        filteredProducts: [...action.payload],
      }

    case SET_GRID_VIEW:
      return { ...state, gridView: true }

    case SET_LIST_VIEW:
      return { ...state, gridView: false }

    case UPDATE_SORT:
      return { ...state, sort: action.payload }

    case SORT_PRODUCTS:
      const { sort, filteredProducts } = state
      let tempProducts = [...filteredProducts]

      // Apply sorting based on selected option
      if (sort === 'price-lowest') {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price)
      }

      if (sort === 'price-highest') {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price)
      }

      if (sort === 'name-a') {
        tempProducts = tempProducts.sort((a, b) => a.name.localeCompare(b.name))
      }

      if (sort === 'name-z') {
        tempProducts = tempProducts.sort((a, b) => b.name.localeCompare(a.name))
      }

      return { ...state, filteredProducts: tempProducts }

    default:
      throw new Error(`No matching "${action.type}" action type`)
  }
}

export default filter_reducer