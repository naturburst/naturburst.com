// src/components/Footer.tsx
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa'
import logoWhite from '../assets/logo-white.png' // Will need a white version of your logo

const Footer = () => {
  return (
    <Wrapper>
      <div className='footer-center'>
        <div className='footer-logo'>
          <img src={logoWhite} alt='NatureBurst' />
          <p>Premium freeze-dried fruits with all the taste and nutrients of fresh produce, no additives.</p>
          <div className='social-icons'>
            <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'>
              <FaFacebookF />
            </a>
            <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
              <FaTwitter />
            </a>
            <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'>
              <FaInstagram />
            </a>
            <a href='https://pinterest.com' target='_blank' rel='noopener noreferrer'>
              <FaPinterest />
            </a>
          </div>
        </div>
        
        <div className='footer-links'>
          <h4>quick links</h4>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/products'>Shop</Link>
            </li>
            <li>
              <Link to='/contact'>Contact</Link>
            </li>
          </ul>
        </div>
        
        <div className='footer-info'>
          <h4>information</h4>
          <ul>
            <li>
              <Link to='/shipping'>Shipping & Delivery</Link>
            </li>
            <li>
              <Link to='/faq'>FAQ</Link>
            </li>
            <li>
              <Link to='/terms'>Terms & Conditions</Link>
            </li>
            <li>
              <Link to='/privacy'>Privacy Policy</Link>
            </li>
          </ul>
        </div>
        
        <div className='footer-contact'>
          <h4>contact us</h4>
          <p>123 Nature Way, Green Valley, CA 95123</p>
          <p>Phone: (555) 123-4567</p>
          <p>Email: hello@natureburst.com</p>
          <p>Monday - Friday: 9AM - 5PM PST</p>
        </div>
      </div>
      
      <div className='footer-bottom'>
        <p>
          &copy; {new Date().getFullYear()} NatureBurst. All rights reserved.
        </p>
        <p>
          Designed and developed with <span>♥</span> for nature
        </p>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  background: var(--clr-primary-1);
  color: var(--clr-white);
  padding: 4rem 0 1rem 0;
  
  .footer-center {
    width: 90vw;
    margin: 0 auto;
    display: grid;
    gap: 2rem;
    max-width: var(--max-width);
  }
  
  .footer-logo {
    img {
      max-width: 180px;
      margin-bottom: 1rem;
    }
    
    p {
      color: var(--clr-grey-8);
      max-width: 25rem;
      margin-bottom: 1.5rem;
    }
    
    .social-icons {
      display: flex;
      gap: 1rem;
      
      a {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background: var(--clr-primary-5);
        color: var(--clr-white);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        
        &:hover {
          background: var(--clr-white);
          color: var(--clr-primary-5);
          transform: translateY(-3px);
        }
      }
    }
  }
  
  h4 {
    color: var(--clr-white);
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: var(--spacing);
  }
  
  .footer-links,
  .footer-info,
  .footer-contact {
    ul {
      list-style-type: none;
    }
    
    li {
      margin-bottom: 0.75rem;
    }
    
    a {
      color: var(--clr-grey-8);
      transition: var(--transition);
      
      &:hover {
        color: var(--clr-primary-5);
        padding-left: 0.5rem;
      }
    }
    
    p {
      color: var(--clr-grey-8);
      margin-bottom: 0.75rem;
    }
  }
  
  .footer-bottom {
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--clr-primary-3);
    text-align: center;
    
    p {
      color: var(--clr-grey-8);
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      
      span {
        color: var(--clr-primary-5);
      }
    }
  }
  
  @media (min-width: 768px) {
    .footer-center {
      grid-template-columns: 2fr 1fr 1fr;
    }
    
    .footer-contact {
      grid-column: 1 / 2;
      grid-row: 2 / 3;
    }
  }
  
  @media (min-width: 992px) {
    .footer-center {
      grid-template-columns: 2fr 1fr 1fr 1fr;
    }
    
    .footer-contact {
      grid-column: auto;
      grid-row: auto;
    }
  }
`

export default Footer