import React from 'react'
import styled from 'styled-components'
import { formatPrice } from '../utils/helpers'
import AmountButtons from './AmountButtons'
import { FaTrash } from 'react-icons/fa'
import { cartType, useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'

const CartItem: React.FC<{ cartItem: cartType }> = ({ cartItem }) => {
  const { id, image, name, price, amount, slug } = cartItem

  const { removeItem, toggleAmount } = useCartContext()

  const increase: () => void = () => {
    toggleAmount(id, 'inc')
  }
  const decrease: () => void = () => {
    toggleAmount(id, 'dec')
  }

  return (
    <Wrapper>
      {/* item column */}
      <div className='title'>
        <Link to={`/products/${slug}`}>
          <img src={image} alt={name} />
        </Link>
        <div className="item-info">
          <h5 className='name'>{name}</h5>
          <h5 className='price-small'>{formatPrice(price)}</h5>
        </div>
      </div>

      {/* price column */}
      <div className='price'>{formatPrice(price)}</div>

      {/* quantity column */}
      <div className="amount-container">
        <AmountButtons amount={amount} increase={increase} decrease={decrease} />
      </div>

      {/* subtotal column */}
      <h5 className='subtotal'>{formatPrice(price * amount)}</h5>

      {/* remove icon */}
      <button
        type='button'
        className='remove-btn'
        onClick={() => removeItem(id)}
        aria-label="Remove item"
      >
        <FaTrash />
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 1.5rem 1rem;
  margin-bottom: 3rem;
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  align-items: center;
  position: relative;

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-3px);
  }

  .subtotal {
    display: none;
  }

  .price {
    display: none;
  }

  .title {
    grid-template-rows: 75px;
    display: grid;
    grid-template-columns: 75px auto;
    align-items: center;
    text-align: left;
    gap: 1rem;
  }

  img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: contain;
    background: var(--clr-grey-10);
  }

  .item-info {
    display: flex;
    flex-direction: column;
  }

  h5 {
    font-size: 0.85rem;
    margin-bottom: 0;
    font-weight: 600;
  }

  .name {
    color: var(--clr-grey-1);
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .price-small {
    color: var(--clr-primary-5);
    font-weight: 700;
  }

  .amount-container {
    margin: 0 auto;
  }

  .amount-btns {
    width: 100px;
    button {
      width: 1.5rem;
      height: 1.5rem;
    }
    h2 {
      font-size: 1.2rem;
    }
  }

  .remove-btn {
    color: white;
    background: #e74c3c;
    border: none;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    font-size: 0.85rem;
    transition: all 0.3s ease;

    &:hover {
      background: #c0392b;
      transform: scale(1.1);
    }
  }

  @media (min-width: 776px) {
    grid-template-columns: 1fr 1fr 1fr 1fr auto;
    align-items: center;

    .subtotal {
      display: block;
      font-size: 1rem;
      color: var(--clr-grey-5);
      font-weight: 400;
    }

    .price-small {
      display: none;
    }

    .price {
      display: block;
      font-size: 1rem;
      color: var(--clr-primary-5);
      font-weight: 600;
    }

    .name {
      font-size: 0.9rem;
    }

    .title {
      height: 100%;
      grid-template-columns: 100px auto;
    }
  }

  @media (max-width: 575px) {
    grid-template-columns: 1fr;

    .title {
      grid-column: 1 / -1;
      grid-template-columns: 75px auto;
    }

    .amount-container {
      margin: 1rem 0;
    }

    .remove-btn {
      position: absolute;
      top: 15px;
      right: 15px;
      width: 1.5rem;
      height: 1.5rem;
      font-size: 0.75rem;
    }
  }
`

export default CartItem