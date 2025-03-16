// src/components/FeaturedProducts/FeaturedProducts.tsx
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Product from '../Product'
import { useProductsContext } from '../../context/products_context'

const FeaturedProducts = () => {
  const { featuredProducts } = useProductsContext()

  return (
    <Wrapper className='section'>
      <div className='title'>
        <h2>our products</h2>
        <div className='underline'></div>
        <p className='subtitle'>
          Experience the pure taste of nature in every bite with our premium freeze-dried fruits
        </p>
      </div>
      
      <div className='section-center featured'>
        {featuredProducts &&
          featuredProducts.map(product => (
            <Product key={product.id} product={product} />
          ))}
      </div>
      
      <Link to='/products' className='btn'>
        all products
      </Link>
    </Wrapper>
  )
}

export default FeaturedProducts

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  padding: 8rem 0;
  
  .title {
    text-align: center;
    margin-bottom: 3rem;
    
    h2 {
      font-size: 2.8rem;
      color: var(--clr-primary-1); /* Dark green color for text */
      margin-bottom: 1rem;
      font-weight: 700;
      letter-spacing: 1px;
    }

    .underline {
      width: 6rem;
      height: 0.25rem;
      background: var(--clr-accent-1); /* Brown color for accent */
      margin: 0 auto;
      margin-bottom: 2rem;
    }

    .subtitle {
      max-width: 650px;
      margin: 0 auto;
      font-size: 1.2rem;
      color: var(--clr-grey-5);
    }
  }

  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 3rem; /* Increased spacing between products */

    img {
      height: 225px;
    }
  }

  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
    background: var(--clr-accent-1); /* Brown color for button */
    border-radius: 25px;
    font-weight: 600;
    font-size: 1rem;
    letter-spacing: 1px;
    transition: all 0.3s ease;

    &:hover {
      background: var(--clr-primary-3);
      color: var(--clr-white);
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
  }

  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }

  /* Fix spacing issues on different screen sizes */
  @media (min-width: 992px) {
    .featured {
      grid-template-columns: repeat(3, 1fr);
      gap: 2.5rem; /* Consistent spacing on larger screens */
    }
  }

  @media (max-width: 991px) and (min-width: 768px) {
    .featured {
      grid-template-columns: repeat(2, 1fr);
      gap: 2.5rem;
    }
  }
`