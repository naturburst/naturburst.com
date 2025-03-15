import React from 'react'
import styled from 'styled-components'
import heroImage from '../assets/hero.jpg' // Will need a new hero image
import { Link } from 'react-router-dom'

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
          Tropi Treats preserves all the natural goodness and flavor without any 
          additives or preservatives.
        </p>
        <Link to='/products' className='btn hero-btn'>
          shop now
        </Link>
      </article>
      <article className='img-container'>
        <img src={heroImage} alt='Assorted freeze-dried fruits' className='main-img' />
      </article>
    </Wrapper>
  )
}

export default Hero

const Wrapper = styled.section`
  min-height: 60vh;
  display: grid;
  place-items: center;
  .img-container {
    display: none;
  }

  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 1rem;
    color: var(--clr-grey-5);
    font-size: 1rem;
  }
  
  @media (min-width: 992px) {
    height: calc(100vh - 5rem);
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    h1 {
      margin-bottom: 2rem;
      font-size: 3.5rem;
      background: linear-gradient(to right, var(--clr-primary-3), var(--clr-accent-1));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p {
      font-size: 1.25rem;
    }
    .hero-btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      background: var(--clr-primary-5);
      border-radius: 25px;
    }
    .hero-btn:hover {
      background: var(--clr-primary-3);
      color: var(--clr-white);
    }
    .img-container {
      display: block;
      position: relative;
    }
    .main-img {
      width: 100%;
      height: 550px;
      position: relative;
      border-radius: var(--radius);
      display: block;
      object-fit: cover;
      box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
    }
    .img-container::before {
      content: '';
      position: absolute;
      width: 10%;
      height: 80%;
      background: var(--clr-accent-1);
      bottom: 0%;
      left: -8%;
      border-radius: var(--radius);
      opacity: 0.7;
    }
    .img-container::after {
      content: '';
      position: absolute;
      width: 15%;
      height: 60%;
      background: var(--clr-primary-6);
      top: 10%;
      right: -8%;
      border-radius: var(--radius);
      opacity: 0.7;
    }
  }
`