import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return (
    <Wrapper>
      <div className='footer-center'>
        <div className='footer-content'>
          <div className='logo-section'>
            <h3>NaturBurst</h3>
            <p>Premium freeze-dried fruits with all the natural goodness. No additives, no preservatives - just pure fruit bliss.</p>
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
            </div>
          </div>

          <div className='links-section'>
            <div className='link-group'>
              <h4>Quick Links</h4>
              <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/products'>Shop</Link></li>
                <li><Link to='/contact'>Contact</Link></li>
              </ul>
            </div>

            <div className='link-group'>
              <h4>Contact Us</h4>
              <p>hello@naturburst.com</p>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        <div className='copyright'>
          &copy; {new Date().getFullYear()} NaturBurst. All rights reserved.
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  background: var(--clr-primary-1);
  color: var(--clr-white);
  padding: 3rem 0 1.5rem 0;

  .footer-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }

  .footer-content {
    display: grid;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .logo-section {
    h3 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    p {
      color: var(--clr-grey-8);
      margin-bottom: 1.5rem;
      max-width: 500px;
    }
  }

  .social-icons {
    display: flex;
    gap: 1rem;

    a {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--clr-primary-5);
      color: var(--clr-white);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition);

      &:hover {
        background: var(--clr-white);
        color: var(--clr-primary-5);
        transform: translateY(-3px);
      }
    }
  }

  .links-section {
    display: grid;
    gap: 2rem;
  }

  .link-group {
    h4 {
      margin-bottom: 1rem;
      font-size: 1.2rem;
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
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
      margin-bottom: 0.5rem;
    }
  }

  .copyright {
    text-align: center;
    padding-top: 1.5rem;
    border-top: 1px solid var(--clr-primary-3);
    color: var(--clr-grey-8);
    font-size: 0.9rem;
  }

  @media (min-width: 768px) {
    .footer-content {
      grid-template-columns: 1fr 1fr;
      align-items: start;
    }

    .links-section {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 992px) {
    .footer-content {
      grid-template-columns: 2fr 1fr;
    }
  }
`

export default Footer