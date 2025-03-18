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
      <Wrapper>
        <div className='products-section'>
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
  width: 100%;
  padding: 0;

  .products-section {
    width: 100%;
    max-width: 100%;
    padding: 4rem 2rem;
    background: #f7f7f7;
  }

  .products-header {
    text-align: center;
    max-width: 700px;
    margin: 0 auto 3rem;

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
    width: 100%;
    margin: 0 auto;
  }

  @media (min-width: 576px) {
    .products-section {
      padding: 4rem 4rem;
    }

    .products-container {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      max-width: 100%;
    }
  }

  @media (min-width: 992px) {
    .products-section {
      padding: 4rem 6rem;
    }

    .products-container {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
  }

  @media (min-width: 1400px) {
    .products-section {
      padding: 4rem 8rem;
    }
  }

  @media (max-width: 575px) {
    .products-section {
      padding: 3rem 1rem;
    }

    .products-container {
      grid-template-columns: 1fr;
      overflow-y: auto;
      max-height: none; /* Allow natural height */
    }
  }
`

export default ProductsPage