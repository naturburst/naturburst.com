import React from 'react'
import styled from 'styled-components'
import { useCartContext } from '../context/cart_context'
import { formatPrice } from '../utils/helpers'
import { Link } from 'react-router-dom'
import { FaShoppingBag } from 'react-icons/fa'

const CartTotals = () => {
  const { totalAmount } = useCartContext()

  return (
    <Wrapper>
      <div className="totals-card">
        <h3>Order Summary</h3>

        <div className='summary-item'>
          <span className="label">Subtotal:</span>
          <span className="value">{formatPrice(totalAmount)}</span>
        </div>

        <div className='summary-item'>
          <span className="label">Shipping:</span>
          <span className="value shipping">FREE!</span>
        </div>

        <div className="coupon-container">
          <input type="text" placeholder="Enter coupon code" />
          <button type="button" className="apply-btn">Apply</button>
        </div>

        <div className='summary-item total'>
          <span className="label">Total:</span>
          <span className="value total-value">{formatPrice(totalAmount)}</span>
        </div>

        <div className="checkout-btn-container">
          <Link to='/checkout' className='btn checkout-btn'>
            <FaShoppingBag className="btn-icon" /> Proceed to Checkout
          </Link>
        </div>

        <div className="payment-methods">
          <img src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Fotter_payment_icn_2_900x.png?v=1632725578" alt="Payment methods" className="payment-img" />
        </div>
      </div>
    </Wrapper>
  )
}

export default CartTotals

const Wrapper = styled.section`
  margin: 3rem 0;
  display: flex;
  justify-content: center;

  .totals-card {
    background: white;
    border-radius: 15px;
    padding: 2rem;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
    width: 100%;
    max-width: 450px;
  }

  h3 {
    font-size: 1.5rem;
    color: var(--clr-grey-1);
    margin-bottom: 1.5rem;
    font-weight: 700;
    text-align: center;
  }

  .summary-item {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--clr-grey-9);

    .label {
      color: var(--clr-grey-3);
      font-weight: 600;
    }

    .value {
      color: var(--clr-grey-5);
      font-weight: 600;

      &.shipping {
        color: #27ae60;
      }
    }

    &.total {
      margin-top: 0.5rem;
      padding-top: 1rem;
      border-top: 2px solid var(--clr-grey-9);
      border-bottom: none;
      font-size: 1.2rem;

      .label {
        color: var(--clr-grey-1);
        font-weight: 700;
      }

      .total-value {
        color: var(--clr-primary-5);
        font-weight: 700;
      }
    }
  }

  .coupon-container {
    display: flex;
    margin: 1.5rem 0;

    input {
      flex: 1;
      padding: 0.75rem 1rem;
      border: 1px solid var(--clr-grey-8);
      border-radius: 30px 0 0 30px;
      font-size: 0.95rem;

      &:focus {
        outline: none;
        border-color: var(--clr-primary-5);
      }
    }

    .apply-btn {
      background: var(--clr-primary-5);
      color: white;
      border: none;
      padding: 0 1.25rem;
      border-radius: 0 30px 30px 0;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: var(--clr-primary-3);
      }
    }
  }

  .checkout-btn-container {
    margin-top: 1.5rem;

    .checkout-btn {
      width: 100%;
      padding: 1rem;
      font-weight: 700;
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;

      .btn-icon {
        font-size: 1.1rem;
      }
    }
  }

  .payment-methods {
    margin-top: 1.5rem;
    text-align: center;

    .payment-img {
      max-width: 100%;
      height: auto;
    }
  }

  @media (max-width: 576px) {
    margin: 2rem 0 3rem;

    .totals-card {
      padding: 1.5rem;
    }
  }
`