import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaInstagram, FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {
  // Updated Google Maps location link with full place details
  const directionsUrl = "https://www.google.com/maps/place/PRESTIGE+WEST+WOODS,+Gopalapura,+Binnipete,+Bengaluru,+Karnataka+560023,+India/@12.9776301,77.5630992,18z/data=!3m1!4b1!4m6!3m5!1s0x3bae161d4bde1ac1:0xd0454380d2d678cd!8m2!3d12.9775109!4d77.5631957!16s%2Fg%2F11j2zxr1w0?entry=ttu"

  return (
    <Wrapper>
      <div className='footer-center'>
        <div className='footer-content'>
          <div className='logo-section'>
            <h3>NatureBurst</h3>
            <p>Premium freeze-dried fruits with all the natural goodness. No additives, no preservatives - just pure fruit bliss.</p>
            <div className='social-icons'>
              <a href='https://www.instagram.com/tropitreats.shop' target='_blank' rel='noopener noreferrer'>
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
              <p>natureburst.shop@gmail.com</p>
              <p>+91 90984 04225</p>

              {/* Address and directions button separated */}
              <address className="footer-address">
                Prestige West Woods<br />
                Magadi Road, Gopalpura<br />
                Bengaluru, Karnataka 560023
              </address>

              {/* Directions button moved below address */}
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="directions-btn"
              >
                <div className="map-indicator">
                  <FaMapMarkerAlt className="map-icon" /> Get Directions
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className='copyright'>
          &copy; {new Date().getFullYear()} Natureburst. All rights reserved.
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  background: linear-gradient(to right, var(--clr-primary-1), var(--clr-primary-2));
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

  /* Footer address styling */
  .footer-address {
    color: var(--clr-grey-8);
    font-style: normal;
    line-height: 1.6;
    margin-bottom: 0.75rem;
  }

  /* Standalone directions button styling */
  .directions-btn {
    text-decoration: none;
    display: inline-block;
  }

  .map-indicator {
    display: flex;
    align-items: center;
    color: var(--clr-primary-5);
    font-weight: 500;
    transition: var(--transition);

    &:hover {
      color: var(--clr-accent-3);
    }
  }

  .map-icon {
    margin-right: 0.5rem;
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