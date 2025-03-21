import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { productDataType } from '../utils/productData'
import { useCartContext } from '../context/cart_context'
import AmountButtons from './AmountButtons'
import { FaShoppingCart, FaHeart } from 'react-icons/fa'

const AddToCart: React.FC<{ singleProduct: productDataType | {} }> = ({
  singleProduct,
}) => {
  const { addToCart } = useCartContext()
  // need the number of stock here as well after setting up in productData array
  const { id, slug } = { ...singleProduct }
  const [amount, setAmount] = useState(1)

  // if there's stock variable, add logic to allow adding the amount === stock
  const increaseAmount = () => setAmount(amount + 1)

  const decreaseAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1)
    }
  }

  return (
    <Wrapper>
      <div className='quantity-container'>
        <h3>Quantity:</h3>
        <AmountButtons
          amount={amount}
          increase={increaseAmount}
          decrease={decreaseAmount}
        />
      </div>

      <div className='buttons-container'>
        <Link
          to='/cart'
          className='btn add-to-cart-btn'
          onClick={() => addToCart(id, slug, amount, singleProduct)}
        >
          <FaShoppingCart className="cart-icon" />
          ADD TO CART
        </Link>

        <button type="button" className="btn wishlist-btn">
          <FaHeart className="heart-icon" />
          SAVE
        </button>
      </div>
    </Wrapper>
  )
}

export default AddToCart

const Wrapper = styled.section`
  .quantity-container {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;

    h3 {
      font-size: 1.1rem;
      color: var(--clr-grey-1);
      font-weight: 700;
      margin: 0;
      white-space: nowrap;
    }
  }

  .buttons-container {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .add-to-cart-btn {
    flex: 1;
    background: var(--clr-primary-5);
    font-weight: 700;
    font-size: 0.95rem;
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    min-width: 180px;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0,0,0,0.15);

    .cart-icon {
      font-size: 1.1rem;
    }

    &:hover {
      background: var(--clr-primary-3);
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    }
  }

  .wishlist-btn {
    background: transparent;
    border: 2px solid var(--clr-primary-5);
    color: var(--clr-primary-5);
    font-weight: 700;
    font-size: 0.95rem;
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    transition: all 0.3s ease;

    .heart-icon {
      font-size: 1.1rem;
    }

    &:hover {
      background: rgba(42, 157, 143, 0.1);
      transform: translateY(-3px);
    }
  }

  @media (max-width: 576px) {
    .buttons-container {
      flex-direction: column;
    }
  }
`