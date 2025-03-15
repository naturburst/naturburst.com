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
          NaturBurst preserves all the natural goodness and flavor without any
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

        <Link to='/products' className='btn hero-btn'>
          Shop Now
        </Link>
      </article>

      <article className='img-container'>
        <div className='product-images'>
          <img src={getImagePath('/images/custard-apple-detail1.jpg')} alt='Custard Apple' className='product-img custard-apple' />
          <img src={getImagePath('/images/jackfruit-detail1.jpg')} alt='Jackfruit' className='product-img jackfruit' />
          <img src={getImagePath('/images/jamun-detail1.jpg')} alt='Jamun' className='product-img jamun' />
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

  .hero-btn {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
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

      .product-images {
        position: relative;
        height: 500px;
        width: 100%;
      }

      .product-img {
        position: absolute;
        width: 250px;
        height: 250px;
        object-fit: cover;
        border-radius: var(--radius);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      }

      .custard-apple {
        top: 0;
        left: 50px;
        z-index: 1;
        border: 5px solid var(--clr-custard-apple);
      }

      .jackfruit {
        top: 150px;
        right: 0;
        z-index: 2;
        border: 5px solid var(--clr-jackfruit);
      }

      .jamun {
        bottom: 0;
        left: 100px;
        z-index: 3;
        border: 5px solid var(--clr-jamun);
      }
    }
  }
`

export default Hero