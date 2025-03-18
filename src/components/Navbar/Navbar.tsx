import React from 'react'
import styled from 'styled-components'
import CartButtons from '../CartButtons'
import { Logo } from './Logo'
import { MenuIcon } from './MenuIcon'
import { NavLinks } from './NavLinks'

const Nav = () => {
  return (
    <NavContainer>
      <div className="promo-banner">
        <span>FREE SHIPPING ON ORDERS ABOVE ₹500</span>
      </div>

      <div className='nav-center'>
        <div className='nav-header'>
          <Logo />
          <MenuIcon />
        </div>
        <NavLinks className='nav-links' />
        <CartButtons />
      </div>
    </NavContainer>
  )
}

export default Nav

const NavContainer = styled.nav`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #3c8558; /* Updated to match logo's green color */

  .promo-banner {
    width: 100%;
    background: #1a2e37; /* Dark color for contrast */
    color: white;
    text-align: center;
    padding: 0.25rem 1rem;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 1px;

    span {
      display: inline-block;
      padding: 0.25rem 0;
    }
  }

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
  }

  .nav-header {
    display: flex;
    align-items: center;

    img {
      width: 150px;
      height: auto;
      object-fit: contain;
    }
  }

  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-white);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }

  .nav-links {
    display: none;
  }

  @media (min-width: 992px) {
    .nav-header {
      margin-right: 2rem;
    }

    .nav-toggle {
      display: none;
    }

    .nav-center {
      display: flex;
      justify-content: space-between;
    }

    .nav-links {
      display: flex;
      gap: 2rem;

      li {
        padding: 0;
      }

      a {
        color: white;
        font-size: 1.1rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding: 0.75rem 0.5rem;
        font-weight: 700;
        transition: all 0.3s ease;
        position: relative;

        /* Animated underline effect */
        &::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -2px;
          left: 0;
          background-color: white;
          transition: width 0.3s ease;
        }

        &:hover {
          color: #FFD166;  /* Accent color for hover */

          &::after {
            width: 100%;
            background-color: #FFD166;
          }
        }

        /* Active page indicator */
        &.active {
          color: #FFD166;
          font-weight: 700;

          &::after {
            width: 100%;
            height: 3px;
            background-color: #FFD166;
          }
        }
      }
    }
  }

  @media (max-width: 991px) {
    .nav-center {
      justify-content: space-between;
      align-items: center;
    }
  }
`
