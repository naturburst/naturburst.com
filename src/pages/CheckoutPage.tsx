// src/pages/CheckoutPage.tsx
import React, { useState } from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import { useCartContext } from '../context/cart_context'
import { useCurrencyContext } from '../context/currency_context'
import { formatPrice } from '../utils/helpers'
import { Link, useHistory } from 'react-router-dom'

const CheckoutPage = () => {
  const { cart, totalAmount, clearCart } = useCartContext()
  const { currency } = useCurrencyContext()
  const history = useHistory()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Format prices with selected currency
  const { originalPrice, discountedPrice } = formatPrice(totalAmount, currency)

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle checkout submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate processing payment
    setTimeout(() => {
      clearCart()
      history.push('/successful_payment')
    }, 1500)
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
                <span>FREE</span>
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

          <form className='checkout-form' onSubmit={handleSubmit}>
            <h3>Shipping Information</h3>

            <div className='form-group'>
              <label htmlFor='name'>Full Name</label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='email'>Email Address</label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='address'>Street Address</label>
              <input
                type='text'
                id='address'
                name='address'
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor='city'>City</label>
                <input
                  type='text'
                  id='city'
                  name='city'
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='form-group'>
                <label htmlFor='state'>State/Province</label>
                <input
                  type='text'
                  id='state'
                  name='state'
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor='zip'>Postal Code</label>
                <input
                  type='text'
                  id='zip'
                  name='zip'
                  value={formData.zip}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='form-group'>
                <label htmlFor='country'>Country</label>
                <input
                  type='text'
                  id='country'
                  name='country'
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button
              type='submit'
              className='btn submit-btn'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : `Pay ${discountedPrice}`}
            </button>
          </form>
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

  .checkout-form {
    background: var(--clr-white);
    padding: 2rem;
    border-radius: var(--radius);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    
    h3 {
      margin-bottom: 1.5rem;
      font-size: 1.25rem;
    }
    
    .form-group {
      margin-bottom: 1.5rem;
      
      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: var(--clr-grey-3);
      }
      
      input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid var(--clr-grey-8);
        border-radius: var(--radius);
        
        &:focus {
          outline: none;
          border-color: var(--clr-primary-5);
        }
      }
    }
    
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
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
    margin-top: 0.5rem;

    &:hover {
      background: var(--clr-primary-3);
      transform: translateY(-3px);
    }

    &:disabled {
      background: var(--clr-grey-6);
      cursor: not-allowed;
      transform: none;
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
      grid-template-columns: 1fr 1fr;
    }
  }
`

export default CheckoutPage