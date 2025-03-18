import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaLeaf } from 'react-icons/fa'

// Helper function to handle image paths
const getImagePath = (path: string) => {
  return `${process.env.PUBLIC_URL || ''}${path}`;
};

const Hero = () => {
  return (
    <Wrapper className='section-center'>
      <article className='content'>
        <h1>
          Natural Fruit Bliss <br />
          in Every Bite
        </h1>
        <p>
          Experience the pure taste of nature with our premium freeze-dried fruits.
          Natureburst preserves all the natural goodness and flavor without any
          additives or preservatives.
        </p>

        <div className='features'>
          <div className='feature'>
            <FaLeaf className='icon' />
            <span>100% Natural</span>
          </div>
          <div className='feature'>
            <FaLeaf className='icon' />
            <span>No Added Sugar</span>
          </div>
          <div className='feature'>
            <FaLeaf className='icon' />
            <span>No Preservatives</span>
          </div>
        </div>

        <div className="hero-buttons">
          <Link to='/products' className='btn hero-btn'>
            Shop Now
          </Link>

          <Link to="/how-to-use" className="btn hero-btn secondary">
            Learn How to Use
          </Link>
        </div>
      </article>

      <article className='img-container'>
        {/* Product images in aligned grid */}
        <div className='product-images'>
          <div className="product-box custard">
            <img src={getImagePath('/images/custard-apple-detail1.jpg')} alt='Custard Apple' className='product-img' />
          </div>
          <div className="product-box jackfruit">
            <img src={getImagePath('/images/jackfruit-detail1.jpg')} alt='Jackfruit' className='product-img' />
          </div>
          <div className="product-box jamun">
            <img src={getImagePath('/images/jamun-detail1.jpg')} alt='Jamun' className='product-img' />
          </div>
        </div>
      </article>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  min-height: 60vh;
  display: grid;
  place-items: center;
  padding-top: 2rem;

  .content {
    max-width: 550px;
  }

  h1 {
    font-size: 2.8rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(to right, var(--clr-primary-1), var(--clr-primary-5));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1.2;
  }

  p {
    line-height: 1.8;
    font-size: 1.1rem;
    color: var(--clr-grey-5);
    margin-bottom: 2rem;
  }

  .features {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 2rem;

    .feature {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .icon {
        color: var(--clr-primary-5);
      }

      span {
        font-weight: 500;
      }
    }
  }

  .hero-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .hero-btn {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
  }

  .secondary {
    background: var(--clr-accent-1);
  }

  .img-container {
    display: none;
  }

  @media (min-width: 992px) {
    height: calc(100vh - 5rem);
    grid-template-columns: 1fr 1fr;
    gap: 4rem;

    .img-container {
      display: block;
      position: relative;
      height: 100%;
      width: 100%;

      /* Container for the product boxes - uses flexbox for alignment */
      .product-images {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        gap: 2rem;
        padding: 2rem;
      }

      /* Common styling for all product boxes */
      .product-box {
        width: 250px;
        height: 250px;
        border-radius: var(--radius);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        transition: transform 0.3s ease;

        &:hover {
          transform: translateY(-10px);
        }
      }

      /* Product-specific styling */
      .custard {
        border: 5px solid var(--clr-custard-apple);
        align-self: flex-end; /* Align to right */
      }

      .jackfruit {
        border: 5px solid var(--clr-jackfruit);
        align-self: flex-start; /* Align to left */
      }

      .jamun {
        border: 5px solid var(--clr-jamun);
        align-self: flex-end; /* Align to right */
      }

      .product-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
      }
    }
  }

  /* Additional alignment tweaks for larger screens */
  @media (min-width: 1200px) {
    .product-images {
      padding: 3rem;
    }

    .product-box {
      width: 320px;
      height: 320px;
    }
  }
`

export default Hero