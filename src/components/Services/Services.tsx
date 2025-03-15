// src/components/Services/Services.tsx
import React from 'react'
import styled from 'styled-components'
import { services } from '../../utils/constants'

const Services = () => {
  return (
    <Wrapper>
      <div className='section-center'>
        <article className='header'>
          <h3>why choose freeze-dried?</h3>
          <p>
            Our freeze-drying process preserves all the nutritional value and flavor of fresh fruits
            while creating a convenient, shelf-stable snack you can enjoy anytime, anywhere.
          </p>
        </article>
        <div className='services-center'>
          {services.map((service) => {
            const { id, icon, title, text } = service
            return (
              <article key={id} className='service'>
                <span className='icon'>{icon}</span>
                <h4>{title}</h4>
                <p>{text}</p>
              </article>
            )
          })}
        </div>
      </div>
    </Wrapper>
  )
}

export default Services

const Wrapper = styled.section`
  h3,
  h4 {
    color: var(--clr-primary-1);
  }
  padding: 5rem 0;
  background: var(--clr-primary-10);

  .header h3 {
    margin-bottom: 2rem;
    text-transform: none;
    font-size: 2.5rem;
  }
  
  p {
    margin-bottom: 0;
    line-height: 1.8;
    color: var(--clr-primary-3);
  }
  
  .services-center {
    margin-top: 4rem;
    display: grid;
    gap: 2.5rem;
  }
  
  .service {
    background: var(--clr-primary-7);
    text-align: center;
    padding: 2.5rem 2rem;
    border-radius: var(--radius);
    transition: all 0.3s linear;
    
    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      background: var(--clr-primary-5);
      
      p {
        color: var(--clr-white);
      }
      
      span {
        background: var(--clr-white);
        color: var(--clr-primary-5);
      }
      
      h4 {
        color: var(--clr-white);
      }
    }
    
    p {
      color: var(--clr-primary-2);
    }
  }
  
  span {
    width: 4rem;
    height: 4rem;
    display: grid;
    margin: 0 auto;
    place-items: center;
    margin-bottom: 1rem;
    border-radius: 50%;
    background: var(--clr-primary-10);
    color: var(--clr-primary-1);
    svg {
      font-size: 2rem;
    }
  }
  
  @media (min-width: 992px) {
    .header {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
  
  @media (min-width: 576px) {
    .services-center {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
  
  @media (min-width: 1280px) {
    padding: 0;
    .section-center {
      transform: translateY(5rem);
    }
  }
`