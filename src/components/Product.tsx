import React from 'react'
import styled from 'styled-components'
import { formatPrice } from '../utils/helpers'
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { productDataType } from '../utils/productData'
import { useCartContext } from '../context/cart_context'

const Product: React.FC<{ product: productDataType }> = ({ product }) => {
  const { addToCart } = useCartContext()
  const { id, images, name, price, slug, categories } = product
  const image = images[0]

  // Determine background color based on product category
  const getProductColor = (category: string) => {
    switch(category) {
      case 'custard-apple':
        return '#E8F5E9'; // Light green background
      case 'jackfruit':
        return '#FFF8E1'; // Light yellow background
      case 'jamun':
        return '#F3E5F5'; // Light purple background
      default:
        return '#E0F7FA'; // Default light blue background
    }
  }

  // Get weight from the product data or fallback to a default
  const weight = product.weight || '20g';

  return (
    <Wrapper bgcolor={getProductColor(categories)}>
      <div className="container">
        <Link to={`/products/${slug}`} className="image-container">
          <img src={image} alt={name} />
        </Link>

        <div className="card-content">
          <h3>{name}</h3>

          <div className="product-meta">
            <div className="product-type">Tropi Treats</div>
            <div className="weight">{weight}</div>
          </div>

          <div className="price-container">
            <p className="price">{formatPrice(price)}</p>
          </div>

          <button
            type="button"
            className="btn add-to-cart-btn"
            onClick={() => addToCart(id, slug, 1, product)}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </Wrapper>
  )
}

interface WrapperProps {
  bgcolor: string;
}

const Wrapper = styled.article<WrapperProps>`
  .container {
    background: white;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;

    &:hover {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      transform: translateY(-5px);
    }
  }

  .image-container {
    height: 200px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.bgcolor};
    padding: 1rem;
  }

  img {
    max-height: 85%;
    max-width: 85%;
    object-fit: contain;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  .card-content {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background: white;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #1a2e37;
    line-height: 1.3;
  }

  .product-meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;

    .product-type {
      font-size: 0.9rem;
      color: #666;
    }

    .weight {
      font-size: 0.9rem;
      color: #666;
      font-weight: 600;
    }
  }

  .price-container {
    margin-bottom: 1.25rem;

    .price {
      color: #40CEB5; /* Natureburst green */
      font-weight: 700;
      font-size: 1.3rem;
      margin-bottom: 0;
    }
  }

  .add-to-cart-btn {
    width: 100%;
    background: #40CEB5; /* Natureburst green */
    color: white;
    font-weight: 600;
    margin-top: auto;
    text-align: center;
    padding: 0.8rem;
    border-radius: 5px;
    font-size: 0.9rem;

    &:hover {
      background: #36b5a0;
    }
  }

  @media (max-width: 767px) {
    .image-container {
      height: 180px;
    }

    h3 {
      font-size: 1.1rem;
    }

    .price-container .price {
      font-size: 1.1rem;
    }
  }
`

export default Product