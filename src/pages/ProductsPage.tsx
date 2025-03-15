import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import { useProductsContext } from '../context/products_context'
import Product from '../components/Product'

const ProductsPage = () => {
  const { allProducts, productsLoading } = useProductsContext()

  return (
    <main>
      <PageHero title='products' />
      <Wrapper className='page'>
        <div className='section-center products'>
          <div className='products-header'>
            <h2>Our Products</h2>
            <p>
              Experience the pure taste of nature with our premium freeze-dried fruits.
              No additives, no preservatives – just 100% natural fruit goodness.
            </p>
          </div>

          {productsLoading ? (
            <div className='loading'></div>
          ) : (
            <div className='products-container'>
              {allProducts.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.div`
  .products {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    margin: 4rem auto;
  }

  .products-header {
    text-align: center;
    max-width: 700px;
    margin: 0 auto;

    h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: var(--clr-primary-3);
    }

    p {
      font-size: 1.1rem;
      color: var(--clr-grey-5);
    }
  }

  .products-container {
    display: grid;
    gap: 2rem;
  }

  @media (min-width: 576px) {
    .products-container {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
  }

  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`

export default ProductsPage