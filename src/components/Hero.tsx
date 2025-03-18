// src/components/Hero.tsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

// Helper function to handle image paths
const getImagePath = (path: string) => {
  return `${process.env.PUBLIC_URL || ''}${path}`;
};

const Hero = () => {
  return (
    <Wrapper>
      <div className="hero-container">
        <div className="hero-content">
          <div className="text-container">
            <h1>
              <span className="crispy">CRISPY,</span> <span className="crunchy">CRUNCHY</span>
            </h1>
            <h2 className="irresistible">IRRESISTIBLE</h2>

            <div className="hero-buttons">
              <Link to="/products" className="btn shop-now-btn">
                <FaShoppingCart className="cart-icon" /> SHOP NOW
              </Link>
              <Link to="/how-to-use" className="btn learn-more-btn">
                HOW TO USE
              </Link>
            </div>
          </div>

          <div className="product-showcase">
            <div className="product-images">
              <img
                src={getImagePath('/images/custard-apple-detail1.jpg')}
                alt="Freeze-dried custard apple"
                className="product-img custard-apple"
              />
              <img
                src={getImagePath('/images/jackfruit-detail1.jpg')}
                alt="Freeze-dried jackfruit"
                className="product-img jackfruit"
              />
              <img
                src={getImagePath('/images/jamun-detail1.jpg')}
                alt="Freeze-dried jamun"
                className="product-img jamun"
              />
            </div>
            <div className="fun-text">
              Pop, Crunch, Wow!
            </div>
          </div>
        </div>
      </div>

      <div className="wave-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
          <path
            fill="#FFF"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
          ></path>
        </svg>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 0;
  margin-bottom: 2rem;

  .hero-container {
    background: linear-gradient(135deg, #FFD166 0%, #F4A261 100%);
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  .text-container {
    flex: 1;
    padding: 2rem;
    z-index: 2;
  }

  h1 {
    font-size: 3.5rem;
    line-height: 1;
    margin: 0;
    font-weight: 800;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);

    .crispy {
      color: #fff;
    }

    .crunchy {
      color: #fff;
    }
  }

  .irresistible {
    font-size: 4.5rem;
    color: #9C4A1A;
    font-weight: 900;
    margin: 0.5rem 0 1.5rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    letter-spacing: -1px;
  }

  .tagline {
    font-size: 1.5rem;
    color: #fff;
    font-weight: 600;
    margin-bottom: 2rem;
    font-family: "Comic Sans MS", cursive, sans-serif;
  }

  .hero-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
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
    background-color: transparent;
    color: #fff;
    border: 2px solid #fff;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    transition: all 0.3s ease;

    &:hover {
      background-color: rgba(255,255,255,0.2);
      transform: translateY(-3px);
    }
  }

  .product-showcase {
    position: relative;
    display: flex;
    justify-content: center;
    padding: 1rem;
  }

  .product-images {
    display: flex;
    justify-content: center;
    position: relative;
    max-width: 100%;
    margin: 0 auto;
  }

  .product-img {
    width: 150px;
    height: 150px;
    object-fit: contain;
    filter: drop-shadow(0 10px 15px rgba(0,0,0,0.2));
    transition: transform 0.3s ease;
    margin: 0 -1.5rem;

    &:hover {
      transform: translateY(-10px);
    }
  }

  .custard-apple {
    transform: rotate(-5deg);
    z-index: 1;
  }

  .jackfruit {
    transform: rotate(5deg);
    z-index: 3;
  }

  .jamun {
    transform: rotate(-8deg);
    z-index: 2;
  }

  .fun-text {
    position: absolute;
    bottom: 10px;
    right: 10%;
    font-family: "Comic Sans MS", cursive, sans-serif;
    color: #fff;
    font-size: 1.3rem;
    font-weight: 600;
    transform: rotate(-5deg);
    text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
  }

  .wave-divider {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    line-height: 0;
    z-index: 1;

    svg {
      width: 100%;
      height: 60px;
    }
  }

  @media (min-width: 768px) {
    .hero-container {
      min-height: 500px;
      padding: 3rem 2rem;
    }

    .hero-content {
      flex-direction: row;
      gap: 2rem;
    }

    h1 {
      font-size: 4rem;
    }

    .irresistible {
      font-size: 6rem;
    }

    .tagline {
      font-size: 1.8rem;
    }

    .product-img {
      width: 200px;
      height: 200px;
    }
  }

  @media (min-width: 992px) {
    .hero-container {
      min-height: 550px;
    }

    h1 {
      font-size: 5rem;
    }

    .irresistible {
      font-size: 7rem;
    }

    .product-img {
      width: 220px;
      height: 220px;
    }
  }

  @media (max-width: 767px) {
    .hero-container {
      text-align: center;
    }

    .hero-buttons {
      justify-content: center;
    }

    .fun-text {
      right: 50%;
      transform: translateX(50%) rotate(-5deg);
    }
  }
`

export default Hero;