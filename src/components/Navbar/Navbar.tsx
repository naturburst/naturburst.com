// src/components/Navbar/Navbar.tsx
import React from 'react'
import styled from 'styled-components'
import CartButtons from '../CartButtons'
import { Logo } from './Logo'
import { MenuIcon } from './MenuIcon'
import { NavLinks } from './NavLinks'
import CurrencySelector from '../CurrencySelector'
import PromoBanner from '../PromoBanner'

const Nav = () => {
  return (
    <NavContainer>
      <PromoBanner />

      <div className='nav-center'>
        <div className='nav-header'>
          <Logo />
          <MenuIcon />
        </div>
        <NavLinks className='nav-links' />
        <div className='nav-actions'>
          <CurrencySelector />
          <CartButtons />
        </div>
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
  background: #2A5E41; /* Updated darker green to match the logo */

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
    display: flex;
    align-items: center;
    justify-content: space-between;
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

  .nav-header {
    display: flex;
    align-items: center;

    img {
      width: 240px; /* Increased from 150px to make logo bigger */
      height: auto;
      object-fit: contain;
    }
  }

  .nav-links {
    display: none;
  }

  .nav-actions {
    display: flex;
    align-items: center;
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

    .nav-header {
      display: flex;
      width: 100%; /* Take full available width */
      justify-content: space-between; /* Push logo and menu icon apart */
      align-items: center;
      padding-right: 1rem; /* Add space before the cart button */
    }

    .nav-header img {
      width: 150px; /* Reduce logo size on mobile */
      max-height: 40px; /* Control the height */
    }
  }

  @media (max-width: 380px) {
    .nav-header img {
      width: 180px;
    }
  }
`