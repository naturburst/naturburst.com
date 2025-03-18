import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useProductsContext } from '../context/products_context'
import { useCartContext } from '../context/cart_context'

const CartButtons = () => {
  const { closeSidebar } = useProductsContext()
  const { totalItems } = useCartContext()
  return (
    <Wrapper className='cart-btn-wrapper'>
      <Link to='/cart' className='cart-btn' onClick={closeSidebar}>
        <span className='cart-container'>
          <FaShoppingCart />
          <span className='cart-value'>{totalItems}</span>
        </span>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  width: auto;
  margin-right: 15px;

  .cart-btn {
    color: white;
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
  }

  .cart-container {
    display: flex;
    align-items: center;
    position: relative;

    svg {
      height: 1.6rem;
      width: 1.6rem;
    }
  }

  .cart-value {
    position: absolute;
    top: -8px;
    right: -8px;
    background: var(--clr-accent-4);
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--clr-primary-1);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
`
export default CartButtons
