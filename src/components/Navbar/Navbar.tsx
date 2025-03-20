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
        </div>
        <NavLinks className='nav-links' />
        <div className='nav-actions'>
          <CurrencySelector />
          <CartButtons />
        </div>
        <MenuIcon /> {/* Moved outside of header to position absolutely */}
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
    position: relative; /* For absolute positioning of MenuIcon */
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
        font-family: var(--font-primary); /* Using font variable */

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
      padding: 0.5rem 0;
    }

    .nav-header {
      display: flex;
      width: auto; /* Changed from 100% to let it take its natural width */
      align-items: center;
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