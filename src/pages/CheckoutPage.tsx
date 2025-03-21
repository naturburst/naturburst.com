// src/pages/CheckoutPage.tsx
import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import { useCartContext } from '../context/cart_context'
import { useCurrencyContext } from '../context/currency_context'
import { formatPrice } from '../utils/helpers'
import { Link } from 'react-router-dom'
import { FaShoppingBag } from 'react-icons/fa'

const CheckoutPage = () => {
  const { cart, totalAmount, checkout } = useCartContext()
  const { currency } = useCurrencyContext()

  // Format prices with selected currency
  const { originalPrice, discountedPrice } = formatPrice(totalAmount, currency)

  // Handle checkout
  const handleCheckout = () => {
    checkout()
  }

  if (cart.length < 1) {
    return (
      <PageWrapper>
        <div className='empty'>
          <h2>your cart is empty</h2>
          <Link to='products' className='btn'>
            fill your cart
          </Link>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <Wrapper className='section-center'>
        <h2>Checkout</h2>

        <div className='content'>
          <div className='order-summary'>
            <h3>Order Summary</h3>
            <div className='items'>
              {cart.map(item => {
                // Format the prices for each item
                const { originalPrice: itemOriginalPrice, discountedPrice: itemDiscountedPrice } =
                  formatPrice(item.price, currency)

                const { originalPrice: subtotalOriginal, discountedPrice: subtotalDiscounted } =
                  formatPrice(item.price * item.amount, currency)

                return (
                  <div key={item.id} className='item'>
                    <img src={item.image} alt={item.name} />
                    <div className='info'>
                      <h4>{item.name}</h4>
                      <p>
                        {item.amount} × <span className="prices">
                          <span className="original">{itemOriginalPrice}</span>
                          <span className="discounted">{itemDiscountedPrice}</span>
                        </span>
                      </p>
                    </div>
                    <p className='subtotal'>
                      <span className="original">{subtotalOriginal}</span>
                      <span className="discounted">{subtotalDiscounted}</span>
                    </p>
                  </div>
                )
              })}
            </div>
            <div className='totals'>
              <div className='line'>
                <span>Subtotal:</span>
                <div className="amount-column">
                  <span className="original">{originalPrice}</span>
                  <span>{discountedPrice}</span>
                </div>
              </div>
              <div className='line'>
                <span>Shipping:</span>
                <span>Calculated at checkout</span>
              </div>
              <div className='line total'>
                <span>Total:</span>
                <div className="amount-column">
                  <span className="original">{originalPrice}</span>
                  <span>{discountedPrice}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="checkout-actions">
            <p className="info-text">
              You'll be redirected to Shopify's secure checkout page to complete your purchase.
            </p>
            <button
              onClick={handleCheckout}
              className='btn submit-btn'
            >
              <FaShoppingBag className="btn-icon" /> Continue to Checkout
            </button>
            <Link to='/products' className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      </Wrapper>
    </PageWrapper>
  )
}

const PageWrapper: React.FC = ({ children }) => {
  return (
    <main>
      <PageHero title='checkout' />
      <Wrapper className='page'>{children}</Wrapper>
    </main>
  )
}

const Wrapper = styled.div`
  padding: 3rem 0;

  h2 {
    margin-bottom: 2rem;
    text-align: center;
  }

  .content {
    display: grid;
    gap: 3rem;
  }

  .order-summary {
    background: var(--clr-grey-10);
    padding: 2rem;
    border-radius: var(--radius);

    h3 {
      margin-bottom: 1.5rem;
      font-size: 1.25rem;
    }

    .items {
      margin-bottom: 2rem;
    }

    .item {
      display: grid;
      grid-template-columns: 60px 1fr auto;
      gap: 1rem;
      margin-bottom: 1.5rem;
      align-items: center;

      img {
        width: 60px;
        height: 60px;
        border-radius: var(--radius);
        object-fit: cover;
      }

      .info {
        h4 {
          margin-bottom: 0.25rem;
          font-size: 1rem;
        }

        p {
          color: var(--clr-grey-5);
          margin-bottom: 0;
          font-size: 0.9rem;
        }

        .prices {
          display: inline-flex;
          flex-direction: column;

          .original {
            text-decoration: line-through;
            color: #888;
            font-size: 0.8rem;
          }

          .discounted {
            color: var(--clr-primary-5);
            font-weight: 600;
          }
        }
      }

      .subtotal {
        font-weight: 600;
        margin-bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        .original {
          text-decoration: line-through;
          color: #888;
          font-size: 0.8rem;
        }

        .discounted {
          color: var(--clr-primary-5);
        }
      }
    }

    .totals {
      border-top: 1px solid var(--clr-grey-8);
      padding-top: 1.5rem;

      .line {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;

        span:first-child {
          color: var(--clr-grey-3);
        }

        .amount-column {
          display: flex;
          flex-direction: column;
          align-items: flex-end;

          .original {
            text-decoration: line-through;
            color: #888;
            font-size: 0.8rem;
          }
        }
      }

      .total {
        font-weight: 600;
        font-size: 1.2rem;
        margin-top: 1rem;
        border-top: 1px dashed var(--clr-grey-8);
        padding-top: 1rem;
      }
    }
  }

  .checkout-actions {
    background: var(--clr-white);
    padding: 2rem;
    border-radius: var(--radius);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    .info-text {
      color: var(--clr-grey-5);
      margin-bottom: 1.5rem;
      max-width: 400px;
    }

    .submit-btn {
      background: var(--clr-primary-5);
      color: var(--clr-white);
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 25px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: var(--transition);
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      width: 100%;
      max-width: 300px;

      .btn-icon {
        font-size: 1.1rem;
      }

      &:hover {
        background: var(--clr-primary-3);
        transform: translateY(-3px);
      }
    }

    .continue-shopping {
      color: var(--clr-primary-5);
      font-weight: 500;
      transition: var(--transition);

      &:hover {
        color: var(--clr-primary-3);
        text-decoration: underline;
      }
    }
  }

  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }

  @media (min-width: 992px) {
    .content {
      grid-template-columns: 2fr 1fr;
      align-items: start;
    }
  }
`

export default CheckoutPage