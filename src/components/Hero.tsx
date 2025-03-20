import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const Hero = () => {
  return (
    <Wrapper>
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-buttons">
            <Link to="/products" className="shop-now-btn">
              <FaShoppingCart className="cart-icon" />
              SHOP NOW
            </Link>
            <Link to="/how-to-use" className="learn-more-btn">
              HOW TO USE
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  overflow: visible;
  padding: 0;
  margin-bottom: 2rem;

  .hero-container {
    background-image: url('/images/tropi-treats-banner.png'); /* Desktop banner */
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center top;
    min-height: 600px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 2rem 1rem;
    border-bottom: 3px solid #f7f7f7;
  }

  .hero-content {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 2;
    padding-bottom: 2rem;
  }

  .hero-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .shop-now-btn {
    background-color: #2A9D8F;
    color: white;
    font-weight: 700;
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    text-decoration: none;

    &:hover {
      background-color: #1E7D74;
      transform: translateY(-3px);
      box-shadow: 0 6px 15px rgba(0,0,0,0.25);
    }

    .cart-icon {
      font-size: 1.1rem;
    }
  }

  .learn-more-btn {
    background-color: #ffffff;
    color: #2A9D8F;
    border: 2px solid #2A9D8F;
    font-weight: 700;
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    transition: all 0.3s ease;
    text-decoration: none;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);

    &:hover {
      background-color: #2A9D8F;
      color: white;
      transform: translateY(-3px);
      box-shadow: 0 6px 15px rgba(0,0,0,0.2);
    }
  }

  /* Mobile responsive adjustments */
  @media (max-width: 767px) {
    .hero-container {
      background-image: url('/images/tropi-treats-mobile-banner.png');
      min-height: 520px;
      background-size: 100% auto; /* Ensures image fits width fully */
      background-position: top center;
      padding: 0; /* Remove padding to allow full-width image */
      margin: 0; /* Remove margins */
      width: 100%; /* Ensure full width */
    }

    .hero-content {
      padding-bottom: 1.5rem;
      display: flex;
      justify-content: center;
      width: 100%;
    }

    .hero-buttons {
      /* Keep buttons side by side on mobile */
      flex-direction: row;
      align-items: center;
      width: auto; /* Let buttons determine the width */
      max-width: none;
      margin: 0;
      gap: 0.5rem; /* Reduce gap between buttons */
    }

    .shop-now-btn, .learn-more-btn {
      /* Reduce button size on mobile */
      padding: 0.5rem 1rem;
      font-size: 0.85rem;
      font-weight: 600;
    }

    .cart-icon {
      font-size: 0.9rem; /* Smaller icon for mobile */
    }
  }
`;

export default Hero;