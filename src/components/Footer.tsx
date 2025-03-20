import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaInstagram, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  // Updated Google Maps location link with full place details
  const directionsUrl = "https://www.google.com/maps/place/PRESTIGE+WEST+WOODS,+Gopalapura,+Binnipete,+Bengaluru,+Karnataka+560023,+India/@12.9776301,77.5630992,18z/data=!3m1!4b1!4m6!3m5!1s0x3bae161d4bde1ac1:0xd0454380d2d678cd!8m2!3d12.9775109!4d77.5631957!16s%2Fg%2F11j2zxr1w0?entry=ttu"

  return (
    <Wrapper>
      <div className="wave-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
          <path
            fill="#FFF"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className='footer-center'>
        <div className='footer-content'>
          <div className='logo-section'>
            <h3>Nature<span>Burst</span></h3>
            <p>Premium freeze-dried fruits with all the natural goodness. No additives, no preservatives - just pure fruit bliss that keeps all the nutrition intact.</p>

            <div className="contact-info">
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span>natureburst.shop@gmail.com</span>
              </div>
              <div className="contact-item">
                <FaPhoneAlt className="contact-icon" />
                <span>+91 90984 04225</span>
              </div>
            </div>

            <div className='social-icons'>
              <a href='https://www.instagram.com/tropitreats.shop' target='_blank' rel='noopener noreferrer' aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href='#' target='_blank' rel='noopener noreferrer' aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href='#' target='_blank' rel='noopener noreferrer' aria-label="Twitter">
                <FaTwitter />
              </a>
            </div>
          </div>

          <div className='links-section'>
            <div className='link-group'>
              <h4>Quick Links</h4>
              <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/products'>Shop</Link></li>
                <li><Link to='/how-to-use'>How To Use</Link></li>
                <li><Link to='/contact'>Contact</Link></li>
              </ul>
            </div>

            <div className='link-group location-group'>
              <h4>Visit Us</h4>
              <address className="footer-address">
                Prestige West Woods<br />
                Magadi Road, Gopalpura<br />
                Bengaluru, Karnataka 560023
              </address>

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

        <div className='bottom-section'>
          <div className='payment-methods'>
            <img src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Fotter_payment_icn_2_900x.png?v=1632725578" alt="Payment methods" />
          </div>

          <div className='copyright'>
            &copy; {new Date().getFullYear()} NatureBurst. All rights reserved.
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  position: relative;
  background: #2A5E41; /* Updated to match navbar color */
  color: var(--clr-white);
  padding: 5rem 0 2rem 0;

  .wave-divider {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 0;

    svg {
      width: 100%;
      height: 60px;
    }
  }

  .footer-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }

  .footer-content {
    display: grid;
    gap: 3rem;
    margin-bottom: 3rem;
  }

  .logo-section {
    h3 {
      font-size: 2.5rem;
      margin-bottom: 1.5rem;
      font-weight: 800;

      span {
        color: var(--clr-accent-4);
      }
    }

    p {
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 2rem;
      max-width: 500px;
      font-size: 1.1rem;
      line-height: 1.7;
    }
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;

    .contact-item {
      display: flex;
      align-items: center;

      .contact-icon {
        margin-right: 1rem;
        color: var(--clr-accent-4);
      }

      span {
        color: rgba(255, 255, 255, 0.9);
      }
    }
  }

  .social-icons {
    display: flex;
    gap: 1rem;

    a {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      color: var(--clr-white);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;

      &:hover {
        background: var(--clr-accent-4);
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
      margin-bottom: 1.5rem;
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--clr-accent-4);
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    a {
      color: rgba(255, 255, 255, 0.8);
      transition: all 0.3s ease;
      font-size: 1.05rem;

      &:hover {
        color: var(--clr-accent-4);
        padding-left: 0.5rem;
      }
    }
  }

  .footer-address {
    color: rgba(255, 255, 255, 0.8);
    font-style: normal;
    line-height: 1.7;
    margin-bottom: 1rem;
    font-size: 1.05rem;
  }

  .directions-btn {
    text-decoration: none;
    display: inline-block;
  }

  .map-indicator {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 30px;
    color: white;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
      background: var(--clr-accent-4);
      color: var(--clr-primary-5);
    }
  }

  .map-icon {
    margin-right: 0.5rem;
  }

  .bottom-section {
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .payment-methods {
    img {
      max-width: 300px;
      height: auto;
    }
  }

  .copyright {
    text-align: center;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.95rem;
  }

  @media (min-width: 768px) {
    .footer-content {
      grid-template-columns: 1fr 1fr;
      align-items: start;
    }

    .links-section {
      grid-template-columns: 1fr 1fr;
    }

    .bottom-section {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  @media (min-width: 992px) {
    .footer-content {
      grid-template-columns: 1fr 2fr;
    }

    .links-section {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 767px) {
    .location-group {
      grid-column: span 2;
    }

    .payment-methods img {
      max-width: 250px;
    }
  }
`

export default Footer