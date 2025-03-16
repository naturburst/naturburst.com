import React from 'react'
import styled from 'styled-components'
import { formatPrice } from '../utils/helpers'
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { productDataType } from '../utils/productData'
import { useCartContext } from '../context/cart_context'
import { useCurrencyContext } from '../context/currency_context'

const Product: React.FC<{ product: productDataType }> = ({ product }) => {
  const { addToCart } = useCartContext()
  // Access the currency context to get the currently selected currency
  const { currency } = useCurrencyContext()
  const { id, images, name, price, slug, categories } = product
  const image = images[0]

  // Determine background color based on product category
  const getProductColor = (category: string) => {
    switch(category) {
      case 'custard-apple':
        return 'var(--clr-custard-apple)';
      case 'jackfruit':
        return 'var(--clr-jackfruit)';
      case 'jamun':
        return 'var(--clr-jamun)';
      default:
        return 'var(--clr-primary-5)';
    }
  }

  return (
    <Wrapper color={getProductColor(categories)}>
      <div className="container">
        <Link to={`/products/${slug}`} className="image-container">
          <img src={image} alt={name} />
          <div className="info-overlay">
            <h5>{name}</h5>
            {/* Pass the currency to formatPrice to display correct currency price */}
            <p>{formatPrice(price, product, currency)}</p>
          </div>
        </Link>
        <div className="card-footer">
          <h5>{name}</h5>
          {/* Ensure consistent currency display throughout the component */}
          <p>{formatPrice(price, product, currency)}</p>
          <div className="actions">
            <Link to={`/products/${slug}`} className="btn details-btn">
              Details
            </Link>
            <button
              type="button"
              className="btn cart-btn"
              onClick={() => addToCart(id, slug, 1, product)}
            >
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

interface WrapperProps {
  color: string;
}

const Wrapper = styled.article<WrapperProps>`
  .container {
    background: var(--clr-white);
    border-radius: var(--radius);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s linear;
    overflow: hidden;
    height: 100%; /* Ensure consistent height */

    &:hover {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
      transform: translateY(-5px);

      img {
        transform: scale(1.05);
      }

      .info-overlay {
        opacity: 1;
      }
    }
  }

  .image-container {
    position: relative;
    height: 200px;
    overflow: hidden;
    display: block;
  }

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
    transition: var(--transition);
    padding: 1rem; /* Add padding for better product display */
  }

  .info-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: var(--transition);

    h5, p {
      color: var(--clr-white);
      margin: 0.5rem;
    }

    h5 {
      font-size: 1.25rem;
    }

    p {
      font-weight: bold;
      font-size: 1.1rem;
    }
  }

  .card-footer {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    height: calc(100% - 200px); /* Ensure consistent height */

    h5 {
      margin-bottom: 0.5rem;
      font-weight: 600;
      font-size: 1.2rem;
      color: var(--clr-primary-1); /* Dark green text */
    }

    p {
      color: ${props => props.color};
      font-weight: bold;
      margin-bottom: 1.5rem;
      font-size: 1.1rem;
    }

    .actions {
      display: flex;
      gap: 0.5rem;
      margin-top: auto; /* Push buttons to bottom */

      .btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
      }

      .details-btn {
        background: var(--clr-grey-9);
        color: var(--clr-grey-1);

        &:hover {
          background: var(--clr-grey-7);
          color: var(--clr-grey-1);
        }
      }

      .cart-btn {
        background: var(--clr-accent-1); /* Brown button */

        &:hover {
          background: var(--clr-primary-3);
        }
      }
    }
  }
`

export default Product