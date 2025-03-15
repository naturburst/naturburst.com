import React from 'react'
import { useProductsContext } from '../context/products_context'
import GridView from './GridView'
import ListView from './ListView'
import Loading from './Loading'
import { useFilterContext } from '../context/filter_context'

const ProductList = () => {
  const { productsLoading } = useProductsContext()
  const { filteredProducts, gridView } = useFilterContext()

  // Display loading indicator while fetching products
  if (productsLoading) {
    return <Loading />
  }

  // Handle case with no products
  if (filteredProducts.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products found.
      </h5>
    )
  }

  // Display grid or list view based on user preference
  if (!gridView) {
    return <ListView filteredProducts={filteredProducts} />
  }

  return <GridView filteredProducts={filteredProducts} />
}

export default ProductList