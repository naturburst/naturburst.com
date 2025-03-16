// src/pages/SingleProductPage/SingleProductContent.tsx
import React from 'react'
import styled from 'styled-components'
import { useProductsContext } from '../../context/products_context'
import { formatPrice } from '../../utils/helpers'
import { AddToCart } from '../../components'
import { FaLeaf, FaCheck } from 'react-icons/fa'
import { useCurrencyContext } from '../../context/currency_context'
import { productDataType } from '../../utils/productData'

export const SingleProductContent = () => {
  const { singleProduct } = useProductsContext()
  // Extract currency preference for price localization
  const { currency } = useCurrencyContext()

  const {
    name,
    price,
    itemDescription,
    brand,
    stock,
    weight,
    ingredients,
    nutritionalInfo,
    tastingNotes,
    storageInstructions,
  } = { ...singleProduct }

  return (
    <Wrapper>
      <div className='product-info'>
        <h2>{name}</h2>
        <p className='brand'>{brand}</p>
        {/* Fix: Consistent approach using the base price and full product for currency conversion */}
        <h5 className='price'>
          {price && formatPrice(
            price,
            // Only pass singleProduct if it has required properties
            Object.keys(singleProduct).length > 0 ? singleProduct as productDataType : undefined,
            currency
          )}
        </h5>
        <p className='desc'>{itemDescription}</p>

        {/* Product details */}
        <div className='info'>
          <span className='label'>Weight</span>
          <span>{weight}</span>
        </div>

        <div className='info'>
          <span className='label'>Availability</span>
          <span>{stock && stock > 0 ? 'In stock' : 'Out of stock'}</span>
        </div>

        {/* Ingredients section - conditionally rendered */}
        {ingredients && ingredients.length > 0 && (
          <div className='ingredients'>
            <span className='label'>Ingredients</span>
            <div className='ingredients-list'>
              {ingredients.map((ingredient, index) => (
                <span key={index} className='ingredient'>
                  <FaLeaf className='icon' /> {ingredient}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tasting notes section - conditionally rendered */}
        {tastingNotes && (
          <div className='tasting-notes'>
            <span className='label'>Tasting Notes</span>
            <p>{tastingNotes}</p>
          </div>
        )}
      </div>

      {/* Nutritional information - conditionally rendered */}
      {nutritionalInfo && (
        <div className='nutrition-section'>
          <h3>Nutritional Information</h3>
          <div className='nutrition-info'>
            <div className='nutrition-item'>
              <span className='nutrient'>Calories</span>
              <span className='value'>{nutritionalInfo.calories}</span>
            </div>
            <div className='nutrition-item'>
              <span className='nutrient'>Fat</span>
              <span className='value'>{nutritionalInfo.fat}g</span>
            </div>
            <div className='nutrition-item'>
              <span className='nutrient'>Carbs</span>
              <span className='value'>{nutritionalInfo.carbs}g</span>
            </div>
            <div className='nutrition-item'>
              <span className='nutrient'>Protein</span>
              <span className='value'>{nutritionalInfo.protein}g</span>
            </div>
          </div>
        </div>
      )}

      {/* Product features */}
      <div className='product-features'>
        <h3>Product Features</h3>
        <div className='features-list'>
          <div className='feature'>
            <FaCheck className='icon' /> 100% Natural Ingredients
          </div>
          <div className='feature'>
            <FaCheck className='icon' /> No Added Sugar
          </div>
          <div className='feature'>
            <FaCheck className='icon' /> No Preservatives
          </div>
          <div className='feature'>
            <FaCheck className='icon' /> Gluten-Free
          </div>
          <div className='feature'>
            <FaCheck className='icon' /> Vegan Friendly
          </div>
        </div>
      </div>

      {/* Storage instructions - conditionally rendered */}
      {storageInstructions && (
        <div className='storage'>
          <h3>Storage Instructions</h3>
          <p>{storageInstructions}</p>
        </div>
      )}

      {/* Add to cart section - only shown when product is in stock */}
      {stock && stock > 0 && (
        <div className='add-to-cart-section'>
          <AddToCart singleProduct={singleProduct} />
        </div>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .product-info {
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: var(--clr-primary-1);
  }

  .brand {
    font-size: 1.1rem;
    color: var(--clr-grey-5);
    margin-bottom: 0.75rem;
    font-weight: 500;
  }

  .price {
    color: var(--clr-primary-5);
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .desc {
    line-height: 1.8;
    margin-bottom: 1.5rem;
    color: var(--clr-grey-3);
  }

  .info {
    display: flex;
    margin-bottom: 1rem;

    .label {
      min-width: 120px;
      font-weight: 600;
      color: var(--clr-grey-3);
    }
  }

  .ingredients {
    margin-bottom: 1.5rem;

    .label {
      display: block;
      font-weight: 600;
      color: var(--clr-grey-3);
      margin-bottom: 0.5rem;
    }

    .ingredients-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .ingredient {
      display: flex;
      align-items: center;
      background: var(--clr-primary-9);
      padding: 0.3rem 0.6rem;
      border-radius: 20px;
      font-size: 0.9rem;

      .icon {
        color: var(--clr-primary-5);
        margin-right: 0.3rem;
      }
    }
  }

  .tasting-notes {
    margin-bottom: 1.5rem;

    .label {
      display: block;
      font-weight: 600;
      color: var(--clr-grey-3);
      margin-bottom: 0.5rem;
    }

    p {
      font-style: italic;
      color: var(--clr-grey-4);
      margin-bottom: 0;
    }
  }

  .nutrition-section {
    background: var(--clr-primary-10);
    padding: 1.25rem;
    border-radius: var(--radius);
    margin-bottom: 1.5rem;

    h3 {
      color: var(--clr-primary-1);
      margin-bottom: 1rem;
      font-size: 1.2rem;
    }

    .nutrition-info {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 1rem;
    }

    .nutrition-item {
      display: flex;
      flex-direction: column;
    }

    .nutrient {
      font-weight: 600;
      color: var(--clr-primary-3);
      margin-bottom: 0.25rem;
    }

    .value {
      font-size: 1.1rem;
    }
  }

  .product-features {
    margin-bottom: 1.5rem;

    h3 {
      color: var(--clr-primary-1);
      margin-bottom: 1rem;
      font-size: 1.2rem;
    }

    .features-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
    }

    .feature {
      display: flex;
      align-items: center;

      .icon {
        color: var(--clr-primary-5);
        margin-right: 0.5rem;
      }
    }
  }

  .storage {
    background: var(--clr-grey-10);
    padding: 1.25rem;
    border-radius: var(--radius);
    margin-bottom: 1.5rem;

    h3 {
      color: var(--clr-primary-1);
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
    }

    p {
      margin-bottom: 0;
    }
  }

  .add-to-cart-section {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--clr-grey-9);
  }

  @media (max-width: 768px) {
    .product-features .features-list {
      grid-template-columns: 1fr;
    }

    .nutrition-info {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`