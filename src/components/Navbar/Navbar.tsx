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
        {/* Mobile menu icon positioned absolutely to the left */}
        <MenuIcon />

        {/* Logo centered on mobile */}
        <div className='nav-header'>
          <Logo />
        </div>

        {/* Nav links only visible on desktop */}
        <NavLinks className='nav-links' />

        {/* Desktop actions include currency selector, mobile just has cart */}
        <div className='nav-actions'>
          <div className='desktop-only'>
            <CurrencySelector />
          </div>
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
  background: #2A5E41; /* Dark green background */

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative; /* For absolute positioning of MenuIcon */
    padding: 0.5rem 0;
  }

  .nav-header {
    display: flex;
    align-items: center;
  }

  .nav-links {
    display: none;
  }

  .nav-actions {
    display: flex;
    align-items: center;
  }

  /* Desktop styles */
  @media (min-width: 992px) {
    .desktop-only {
      display: block;
    }

    .nav-header {
      margin-right: 2rem;
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
        font-family: var(--font-primary);

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
          color: #FFD166;

          &::after {
            width: 100%;
            background-color: #FFD166;
          }
        }

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

  /* Mobile styles */
  @media (max-width: 991px) {
    position: fixed; /* Fix the header at the top */
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;

    .desktop-only {
      display: none; /* Hide currency selector on mobile */
    }

    .nav-center {
      padding: 0.5rem 0;
    }

    .nav-header {
      width: 100%; /* Take full width for centering */
      justify-content: center; /* Center the logo */
      padding: 0 2rem; /* Add padding for the menu and cart icons */
    }
  }
`