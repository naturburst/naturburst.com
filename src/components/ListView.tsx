import React from 'react'
import styled from 'styled-components'
import { formatPrice } from '../utils/helpers'
import { Link } from 'react-router-dom'
import { productDataType } from '../utils/productData'
import { useCurrencyContext } from '../context/currency_context'

const ListView: React.FC<{ filteredProducts: productDataType[] }> = ({
  filteredProducts,
}) => {
  // Access currency context to maintain consistent currency display across views
  const { currency } = useCurrencyContext()

  return (
    <Wrapper>
      {filteredProducts.map(product => {
        const { slug, images, name, price, itemDescription } = product
        return (
          <article key={slug}>
            <Link to={`/products/${slug}`}>
              <img src={images[0]} alt={name} />
            </Link>

            <div>
              <h4>{name}</h4>
              {/* Apply user's selected currency to product prices */}
              <h5>{formatPrice(price, product, currency)}</h5>
              <p>{itemDescription.substring(0, 150)}...</p>
              <Link to={`/products/${slug}`} className='btn'>
                Details
              </Link>
            </div>
          </article>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;

  img {
    width: 100%;
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  .btn {
    font-size: 0.5rem;
    padding: 0.25rem 0.5rem;
  }
  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
`

export default ListView
