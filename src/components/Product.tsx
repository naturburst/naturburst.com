// src/components/Product.tsx
import React from 'react'
import styled from 'styled-components'
import { formatPrice } from '../utils/helpers'
import { FaSearch, FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { productDataType } from '../utils/productData'
import { useCartContext } from '../context/cart_context'

const Product: React.FC<{ product: productDataType }> = ({ product }) => {
  const { addToCart } = useCartContext()
  const { id, images, name, price, slug } = product
  const image = images[0]

  return (
    <Wrapper>
      <div className='container'>
        <Link to={`/products/${slug}`}>
          <img src={image} alt={name} />
          <div className='info'>
            <h5>{name}</h5>
            <p>{formatPrice(price)}</p>
          </div>
        </Link>
        <div className='buttons'>
          <Link to={`/products/${slug}`} className='detail-btn'>
            <FaSearch />
          </Link>
          <button 
            type='button' 
            className='cart-btn'
            onClick={() => addToCart(id, slug, 1, product)}
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>
      <footer>
        <h5>{name}</h5>
        <p>{formatPrice(price)}</p>
      </footer>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  .container {
    position: relative;
    background: var(--clr-white);
    border-radius: var(--radius);
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s linear;
    
    &:hover {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
      transform: translateY(-5px);
      
      img {
        transform: scale(1.05);
        opacity: 0.8;
      }
      
      .buttons {
        opacity: 1;
      }
      
      .info {
        opacity: 1;
      }
    }
  }
  
  img {
    width: 100%;
    display: block;
    object-fit: cover;
    border-radius: var(--radius) var(--radius) 0 0;
    transition: var(--transition);
    height: 300px;
  }
  
  .info {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    width: 100%;
    padding: 1rem;
    opacity: 0;
    transition: var(--transition);
    
    h5 {
      color: var(--clr-white);
      margin-bottom: 0.5rem;
    }
    
    p {
      color: var(--clr-accent-3);
      margin-bottom: 0;
      font-weight: bold;
    }
  }
  
  .buttons {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.9);
    opacity: 0;
    transition: var(--transition);
    
    .detail-btn, .cart-btn {
      background: var(--clr-primary-5);
      color: var(--clr-white);
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition);
      border: none;
      cursor: pointer;
      
      &:hover {
        background: var(--clr-primary-3);
        transform: scale(1.1);
      }
    }
  }
  
  footer {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    h5 {
      margin-bottom: 0;
      font-weight: 500;
      font-size: 1rem;
    }
    
    p {
      margin-bottom: 0;
      color: var(--clr-primary-5);
      font-weight: bold;
      letter-spacing: var(--spacing);
    }
  }
  
  @media (min-width: 992px) {
    footer h5 {
      font-size: 1rem;
    }
  }
`

export default Product