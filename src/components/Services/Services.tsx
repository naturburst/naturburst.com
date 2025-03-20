// src/components/Services/Services.tsx
import React from 'react'
import styled from 'styled-components'
import { FaCheck } from 'react-icons/fa'

const Services = () => {
  return (
    <Wrapper>
      <div className='section-center'>
        <div className='header-container'>
          <h2>Why Nature<span>Burst</span> Is Different</h2>
          <p>
            Our special freeze-drying process locks in nutrition, flavor, and crunch without additives or preservatives.
            Unlike traditional methods, we preserve up to 97% of nutrients while creating a satisfying crunch that's perfect
            for snacking or adding to your favorite recipes.
          </p>
        </div>

        <div className='benefits-grid'>
          <div className='benefit-card'>
            <div className='benefit-icon natural'></div>
            <h3>100% Natural</h3>
            <p>Our freeze-dried fruits contain absolutely no additives, preservatives, or added sugars. Just pure fruit, exactly as nature intended.</p>
          </div>

          <div className='benefit-card'>
            <div className='benefit-icon nutrients'></div>
            <h3>Nutrient-Rich</h3>
            <p>Our gentle freeze-drying process preserves up to 97% of the nutrients found in fresh fruit, ensuring you get all the vitamins and antioxidants.</p>
          </div>

          <div className='benefit-card'>
            <div className='benefit-icon lifestyle'></div>
            <h3>Lifestyle Friendly</h3>
            <p>Whether you follow a vegan, paleo, keto, or gluten-free diet, our products fit perfectly into your healthy lifestyle choices.</p>
          </div>
        </div>

        <div className='key-benefits'>
          <div className="benefit">
            <FaCheck className="check-icon" />
            <span>100% Natural Ingredients</span>
          </div>
          <div className="benefit">
            <FaCheck className="check-icon" />
            <span>No Added Sugar</span>
          </div>
          <div className="benefit">
            <FaCheck className="check-icon" />
            <span>Rich in Vitamins</span>
          </div>
          <div className="benefit">
            <FaCheck className="check-icon" />
            <span>Extended Shelf Life</span>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Services

const Wrapper = styled.section`
  padding: 3rem 0;
  background: #f7f7f7;

  .section-center {
    width: 90vw;
    max-width: 1200px;
    margin: 0 auto;
  }

  .header-container {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 2.5rem;
  }

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #1a2e37;
    margin-bottom: 1rem;

    span {
      color: #2A9D8F; /* Natureburst green */
    }
  }

  p {
    line-height: 1.6;
    color: #666;
    margin-bottom: 1.5rem;
  }

  .benefits-grid {
    display: grid;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .benefit-card {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    text-align: center;

    h3 {
      font-size: 1.2rem;
      font-weight: 700;
      margin: 1rem 0;
      color: #1a2e37;
    }

    p {
      margin-bottom: 0;
      font-size: 0.95rem;
    }
  }

  .benefit-icon {
    width: 60px;
    height: 60px;
    margin: 0 auto;
    border-radius: 50%;
    background-position: center;
    background-size: 30px;
    background-repeat: no-repeat;
  }

  .natural {
    background-color: rgba(64, 206, 181, 0.15);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232A9D8F'%3E%3Cpath d='M17,8C8,10,5.9,16.17,3.82,21.34L5.71,22l1-2.3A4.49,4.49,0,0,0,8,20a4.67,4.67,0,0,0,1.76-.35,4.65,4.65,0,0,0,6.41-2A4.74,4.74,0,0,0,19.73,12.9a4.64,4.64,0,0,0,.55-2.64,4.47,4.47,0,0,0-1.92-3.11A4.47,4.47,0,0,0,17,8Z'/%3E%3C/svg%3E");
  }

  .nutrients {
    background-color: rgba(64, 206, 181, 0.15);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232A9D8F'%3E%3Cpath d='M11,2a8.002,8.002,0,0,1,7.91,6.7,8,8,0,1,1-7.91-6.7ZM14,15h2v2H14ZM9,15h2v2H9ZM14,10h2v2H14ZM9,10h2v2H9Z'/%3E%3C/svg%3E");
  }

  .lifestyle {
    background-color: rgba(64, 206, 181, 0.15);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232A9D8F'%3E%3Cpath d='M20.5,6A3.5,3.5,0,0,0,17,9.5a3.45,3.45,0,0,0,.55,1.81L14.73,14.1a3.45,3.45,0,0,0-1.81-.55,3.5,3.5,0,0,0-3.5,3.5,3.45,3.45,0,0,0,.55,1.81L7.16,21.56l1.41,1.41,2.71-2.71a3.45,3.45,0,0,0,1.81.55,3.5,3.5,0,0,0,3.5-3.5,3.45,3.45,0,0,0-.55-1.81l2.82-2.82a3.45,3.45,0,0,0,1.81.55,3.5,3.5,0,0,0,0-7Z'/%3E%3C/svg%3E");
  }

  .key-benefits {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin: 0 auto;
    max-width: 900px;

    .benefit {
      display: flex;
      align-items: center;
      background: white;
      padding: 0.5rem 1rem;
      border-radius: 30px;

      .check-icon {
        color: #2A9D8F;
        margin-right: 0.5rem;
      }

      span {
        font-weight: 600;
        color: #1a2e37;
        font-size: 0.9rem;
      }
    }
  }

  @media (min-width: 768px) {
    .benefits-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 767px) {
    h2 {
      font-size: 1.8rem;
    }

    .key-benefits {
      flex-direction: column;
      align-items: center;

      .benefit {
        width: 100%;
        max-width: 250px;
      }
    }
  }
`