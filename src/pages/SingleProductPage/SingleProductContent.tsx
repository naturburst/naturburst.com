import React, { useState } from 'react'
import styled from 'styled-components'
import { useProductsContext } from '../../context/products_context'
import { formatPrice } from '../../utils/helpers'
import { AddToCart } from '../../components'
import { FaCheck, FaShieldAlt, FaTruck } from 'react-icons/fa'

export const SingleProductContent = () => {
  const { singleProduct } = useProductsContext()
  const [activeTab, setActiveTab] = useState('description');

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
    storageInstructions
  } = { ...singleProduct }

  return (
    <Wrapper>
      <div className='product-info'>
        <h1>{name}</h1>
        <p className='brand'>{brand || 'Tropi Treats'}</p>

        <div className="price-container">
          <h2 className='price'>{price && formatPrice(price)}</h2>
          <div className="weight-badge">{weight}</div>
        </div>

        <div className="product-badges">
          <div className="badge">
            <FaShieldAlt className="badge-icon" />
            <span>100% Quality</span>
          </div>
          <div className="badge">
            <FaTruck className="badge-icon" />
            <span>Free Shipping</span>
          </div>
        </div>

        <div className="tabs">
          <button
            className={activeTab === 'description' ? 'tab-btn active' : 'tab-btn'}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={activeTab === 'nutrition' ? 'tab-btn active' : 'tab-btn'}
            onClick={() => setActiveTab('nutrition')}
          >
            Nutrition
          </button>
          <button
            className={activeTab === 'howtouse' ? 'tab-btn active' : 'tab-btn'}
            onClick={() => setActiveTab('howtouse')}
          >
            How to Use
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'description' && (
            <div className="description-tab">
              <p>{itemDescription}</p>

              <div className="key-features">
                <h3>Key Benefits</h3>
                <div className="benefits-list">
                  <div className="benefit-item">
                    <div className="icon-container natural"></div>
                    <div className="benefit-content">
                      <h4>Natural Goodness</h4>
                      <p>100% pure fruit with no additives, preservatives or added sugar</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <div className="icon-container nutrients"></div>
                    <div className="benefit-content">
                      <h4>Nutrient-Rich</h4>
                      <p>Retains up to 97% of nutrients from fresh fruit</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ingredients list */}
              {ingredients && ingredients.length > 0 && (
                <div className='ingredients-section'>
                  <h3>Ingredients</h3>
                  <div className='ingredients-list'>
                    {ingredients.map((ingredient, index) => (
                      <div key={index} className='ingredient-tag'>
                        <FaCheck className='check-icon' /> {ingredient}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tasting notes section */}
              {tastingNotes && (
                <div className='tasting-section'>
                  <h3>Tasting Notes</h3>
                  <p>{tastingNotes}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'nutrition' && nutritionalInfo && (
            <div className="nutrition-tab">
              <div className="nutrition-facts">
                <h3>Nutrition Facts</h3>

                <table className="nutrition-table">
                  <tbody>
                    <tr className="calories">
                      <td>Calories</td>
                      <td className="value">{nutritionalInfo.calories}</td>
                    </tr>
                    <tr>
                      <td>Total Fat</td>
                      <td className="value">{nutritionalInfo.fat}g</td>
                    </tr>
                    <tr>
                      <td>Total Carbohydrates</td>
                      <td className="value">{nutritionalInfo.carbs}g</td>
                    </tr>
                    <tr>
                      <td>Protein</td>
                      <td className="value">{nutritionalInfo.protein}g</td>
                    </tr>
                  </tbody>
                </table>

                <p className="health-benefits">High Vitamin Content Helps To Boost Immunity</p>
                <p className="health-benefits">Helps In Supporting Eye, Skin, Heart, And Hair Health</p>
                <p className="health-benefits">Contains Super Antioxidants Which Is Key In Detoxification</p>
              </div>
            </div>
          )}

          {activeTab === 'howtouse' && (
            <div className="howtouse-tab">
              <div className="usage-suggestions">
                <h3>Creative Ways to Enjoy</h3>
                <div className="usage-list">
                  <div className="usage-item">
                    <h4>Snack Straight from the Pack</h4>
                    <p>Enjoy as a delicious, crunchy snack anytime, anywhere.</p>
                  </div>
                  <div className="usage-item">
                    <h4>Smoothie Booster</h4>
                    <p>Add to your morning smoothie for an intense flavor burst.</p>
                  </div>
                  <div className="usage-item">
                    <h4>Yogurt & Cereal Topping</h4>
                    <p>Sprinkle over yogurt, oatmeal, or cereal for a crunchy texture.</p>
                  </div>
                </div>
              </div>

              {/* Storage instructions */}
              {storageInstructions && (
                <div className='storage-section'>
                  <h3>Storage Tips</h3>
                  <p>{storageInstructions}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Add to cart section */}
        {stock && stock > 0 && (
          <div className='add-to-cart-section'>
            <AddToCart singleProduct={singleProduct} />
          </div>
        )}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .product-info {
    padding: 0 0 2rem 0;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: #1a2e37;
    font-weight: 700;
  }

  .brand {
    font-size: 1rem;
    color: #666;
    margin-bottom: 1.5rem;
  }

  .price-container {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;

    .price {
      color: #40CEB5;
      font-size: 1.8rem;
      font-weight: 700;
      margin: 0;
    }

    .weight-badge {
      margin-left: 1rem;
      background: #f0f0f0;
      padding: 0.3rem 0.8rem;
      border-radius: 5px;
      font-size: 0.9rem;
      font-weight: 600;
      color: #666;
    }
  }

  .product-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2rem;

    .badge {
      display: flex;
      align-items: center;
      background: #f7f7f7;
      padding: 0.5rem 1rem;
      border-radius: 5px;

      .badge-icon {
        color: #40CEB5;
        margin-right: 0.5rem;
      }

      span {
        font-size: 0.9rem;
        font-weight: 600;
        color: #1a2e37;
      }
    }
  }

  .tabs {
    display: flex;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 1.5rem;

    .tab-btn {
      background: transparent;
      border: none;
      padding: 0.75rem 1.25rem;
      font-weight: 600;
      color: #666;
      cursor: pointer;
      position: relative;

      &.active {
        color: #40CEB5;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: #40CEB5;
        }
      }

      &:hover:not(.active) {
        color: #1a2e37;
      }
    }
  }

  .tab-content {
    margin-bottom: 2rem;

    p {
      line-height: 1.7;
      color: #666;
      margin-bottom: 1.5rem;
    }
  }

  .key-features {
    margin-bottom: 2rem;

    h3 {
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 1.25rem;
      color: #1a2e37;
    }

    .benefits-list {
      display: grid;
      gap: 1.5rem;
    }

    .benefit-item {
      display: flex;
      align-items: flex-start;

      .icon-container {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 1rem;
        background-position: center;
        background-size: 25px;
        background-repeat: no-repeat;
        flex-shrink: 0;
      }

      .natural {
        background-color: rgba(64, 206, 181, 0.15);
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2340CEB5'%3E%3Cpath d='M17,8C8,10,5.9,16.17,3.82,21.34L5.71,22l1-2.3A4.49,4.49,0,0,0,8,20a4.67,4.67,0,0,0,1.76-.35,4.65,4.65,0,0,0,6.41-2A4.74,4.74,0,0,0,19.73,12.9a4.64,4.64,0,0,0,.55-2.64,4.47,4.47,0,0,0-1.92-3.11A4.47,4.47,0,0,0,17,8Z'/%3E%3C/svg%3E");
      }

      .nutrients {
        background-color: rgba(64, 206, 181, 0.15);
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2340CEB5'%3E%3Cpath d='M11,2a8.002,8.002,0,0,1,7.91,6.7,8,8,0,1,1-7.91-6.7ZM14,15h2v2H14ZM9,15h2v2H9ZM14,10h2v2H14ZM9,10h2v2H9Z'/%3E%3C/svg%3E");
      }

      .benefit-content {
        h4 {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #1a2e37;
        }

        p {
          margin-bottom: 0;
          font-size: 0.9rem;
        }
      }
    }
  }

  .ingredients-section, .tasting-section, .storage-section {
    margin-bottom: 1.5rem;

    h3 {
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: #1a2e37;
    }
  }

  .ingredients-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    .ingredient-tag {
      background: #f7f7f7;
      padding: 0.4rem 0.8rem;
      border-radius: 5px;
      font-size: 0.9rem;
      display: flex;
      align-items: center;

      .check-icon {
        color: #40CEB5;
        margin-right: 0.4rem;
        font-size: 0.8rem;
      }
    }
  }

  .tasting-section p {
    font-style: italic;
  }

  /* Nutrition Tab Styles */
  .nutrition-facts {
    h3 {
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 1.25rem;
      color: #1a2e37;
      text-align: center;
    }

    .nutrition-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1.5rem;

      tr {
        border-bottom: 1px solid #e0e0e0;

        &.calories {
          font-weight: 700;
        }
      }

      td {
        padding: 0.75rem 0;

        &:first-child {
          color: #1a2e37;
          font-weight: 600;
        }

        &.value {
          text-align: right;
          color: #666;
        }
      }
    }

    .health-benefits {
      background: #FFF9C4;
      padding: 0.75rem 1rem;
      margin-bottom: 0.75rem;
      border-radius: 5px;
      font-weight: 600;
      color: #1a2e37;
    }
  }

  /* How to Use Tab Styles */
  .usage-suggestions {
    margin-bottom: 2rem;

    h3 {
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 1.25rem;
      color: #1a2e37;
    }

    .usage-list {
      display: grid;
      gap: 1.25rem;
    }

    .usage-item {
      background: #f7f7f7;
      padding: 1.25rem;
      border-radius: 5px;

      h4 {
        font-size: 1rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        color: #40CEB5;
      }

      p {
        margin-bottom: 0;
      }
    }
  }

  .storage-section {
    background: #f7f7f7;
    padding: 1.25rem;
    border-radius: 5px;

    h3 {
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
      color: #1a2e37;
    }

    p {
      margin-bottom: 0;
    }
  }

  .add-to-cart-section {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e0e0e0;
  }

  @media (min-width: 768px) {
    .key-features .benefits-list {
      grid-template-columns: repeat(2, 1fr);
    }

    .usage-suggestions .usage-list {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 767px) {
    h1 {
      font-size: 1.5rem;
    }

    .price {
      font-size: 1.5rem;
    }

    .tabs {
      overflow-x: auto;
      white-space: nowrap;

      .tab-btn {
        padding: 0.75rem 1rem;
      }
    }
  }
`