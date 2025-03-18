// src/components/FeaturedProducts/FeaturedProducts.tsx
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Product from '../Product'
import { useProductsContext } from '../../context/products_context'
import { FaArrowRight } from 'react-icons/fa'

const FeaturedProducts = () => {
  const { featuredProducts } = useProductsContext()

  return (
    <Wrapper>
      <div className='section-header'>
        <h2>NEW HERE?</h2>
        <h3>OUR CUSTOMERS LOVE THESE</h3>
      </div>

      <div className='products-grid'>
        {featuredProducts &&
          featuredProducts.map(product => (
            <Product key={product.id} product={product} />
          ))}
      </div>

      <div className="view-all-container">
        <Link to='/products' className='view-all-btn'>
          VIEW ALL PRODUCTS <FaArrowRight className="arrow-icon" />
        </Link>
      </div>
    </Wrapper>
  )
}

export default FeaturedProducts

const Wrapper = styled.section`
  padding: 3rem 0;
  background: white;

  .section-header {
    text-align: center;
    margin-bottom: 2rem;

    h2 {
      font-size: 1.3rem;
      color: #1a2e37;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    h3 {
      font-size: 2rem;
      color: #1a2e37;
      font-weight: 700;
      margin: 0;
    }
  }

  .products-grid {
    display: grid;
    gap: 1.5rem;
    width: 90vw;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 1rem;
  }

  .view-all-container {
    text-align: center;
    margin-top: 2rem;
  }

  .view-all-btn {
    display: inline-flex;
    align-items: center;
    background: #40CEB5;
    color: white;
    font-weight: 600;
    padding: 0.8rem 1.5rem;
    border-radius: 5px;
    transition: all 0.3s ease;

    .arrow-icon {
      margin-left: 0.5rem;
      transition: transform 0.3s ease;
    }

    &:hover {
      background: #36b5a0;

      .arrow-icon {
        transform: translateX(3px);
      }
    }
  }

  @media (min-width: 576px) {
    .products-grid {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }

  @media (min-width: 992px) {
    .products-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }
  }

  @media (max-width: 991px) and (min-width: 768px) {
    .products-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
  }
`