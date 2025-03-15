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

import { initialStateType } from '../context/products_context'
import { productDataType } from '../utils/productData'


const products_reducer = (state: initialStateType, action: any) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true }
  }
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false }
  }
  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, productsLoading: true }
  }
  if (action.type === GET_PRODUCTS_SUCCESS) {
    // data retrieved from API doesn't fit productDataType shape
    const allProducts = action.payload.map((product: any) => {
      // Use optional chaining and nullish coalescing to prevent undefined errors
      const {
        _id: id = '',
        name = '',
        slug = {},
        brand = '',
        categories = {},
        clothingCategories = null, // might be null, need to flatten
        price = 0,
        forWhom = { forWhom: 'all' },
        height = [], //need to flatten
        heightDescription = '',
        age = [], //need to flatten
        ageDescription = '',
        stock = 0,
        itemDescription = '',
        featured = false,
        images = [], //need to flatten
        weight = '',
        ingredients = [],
        nutritionalInfo = null,
        tastingNotes = '',
        storageInstructions = ''
      } = product

      // Safely handle slug extraction
      const extractedSlug = typeof slug === 'object' && slug !== null && 'current' in slug
        ? slug.current
        : (typeof slug === 'string' ? slug : '')

      // Safely handle categories extraction
      const extractedCategories = typeof categories === 'object' && categories !== null && 'categories' in categories
        ? categories.categories
        : (typeof categories === 'string' ? categories : 'other')

      // Safe handling for clothingCategories
      let extractedClothingCategories = null
      if (clothingCategories && typeof clothingCategories === 'object' && 'clothingCategories' in clothingCategories) {
        extractedClothingCategories = clothingCategories.clothingCategories
      }

      // Safe handling for forWhom
      const extractedForWhom = typeof forWhom === 'object' && forWhom !== null && 'forWhom' in forWhom
        ? forWhom.forWhom
        : (typeof forWhom === 'string' ? forWhom : 'all')

      // Safe handling for arrays that need to be flattened
      let flattenedHeight = []
      if (Array.isArray(height)) {
        flattenedHeight = height.map((item) => {
          if (item && typeof item === 'object' && 'height' in item) {
            return item.height
          }
          return typeof item === 'string' ? item : ''
        }).filter(Boolean)
      }

      let flattenedAge = []
      if (Array.isArray(age)) {
        flattenedAge = age.map((item) => {
          if (item && typeof item === 'object' && 'age' in item) {
            return item.age
          }
          return typeof item === 'string' ? item : ''
        }).filter(Boolean)
      }

      // Safe handling for images
      let processedImages = []
      if (Array.isArray(images)) {
        processedImages = images.map((item) => {
          if (item && typeof item === 'object' && 'asset' in item &&
              item.asset && typeof item.asset === 'object' && 'url' in item.asset) {
            return item.asset.url
          }
          return typeof item === 'string' ? item : ''
        }).filter(Boolean)
      }

      // If images is empty, provide a fallback
      if (processedImages.length === 0) {
        processedImages = ['/images/custard-apple-1.jpg']
      }

      return {
        id: id || `fallback-${Math.random().toString(36).substr(2, 9)}`,
        name,
        slug: extractedSlug,
        brand,
        categories: extractedCategories,
        clothingCategories: extractedClothingCategories,
        price,
        stock,
        forWhom: extractedForWhom,
        height: flattenedHeight,
        heightDescription,
        age: flattenedAge,
        ageDescription,
        itemDescription,
        featured,
        images: processedImages,
        weight,
        ingredients,
        nutritionalInfo,
        tastingNotes,
        storageInstructions
      }
    })

    const featuredProducts = allProducts.filter(
      (product: productDataType) => product.featured
    )

    return { ...state, productsLoading: false, allProducts, featuredProducts }
  }
  if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, productsError: true, productsLoading: false }
  }
  if (action.type === GET_SINGLE_PRODUCT_BEGIN){
    return {...state, singleProductLoading: true}
  }
  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    // check if it returns the correct productDataType object instead of an array
    return { ...state, singleProduct: action.payload, singleProductLoading: false }
  }
  if (action.type === GET_SINGLE_PRODUCT_ERROR){
    return { ...state, singleProductError: true, singleProductLoading: false}
  }
  // return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default products_reducer