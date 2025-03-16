// src/components/Navbar/Navbar.tsx
import React from 'react'
import styled from 'styled-components'
import CartButtons from '../CartButtons'
import { Logo } from './Logo'
import { MenuIcon } from './MenuIcon'
import { NavLinks } from './NavLinks'

const Nav = () => {
  return (
    <NavContainer>
      <div className='nav-center'>
        <div className='nav-header'>
          <Logo />
          <MenuIcon />
        </div>
        <NavLinks className='nav-links' />
      </div>
      <CartButtons />
    </NavContainer>
  )
}

export default Nav

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, var(--clr-accent-3), var(--clr-primary-5), var(--clr-accent-3)); /* Gradient background using brand colors */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15); /* Enhanced shadow */

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 180px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-1);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  @media (min-width: 992px) {
    img {
      margin-left: 15px;
    }
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 1rem; /* Increased spacing between nav items */
        position: relative; /* For animated underline effect */
      }
      a {
        color: var(--clr-primary-1);
        font-size: 1.2rem; /* Slightly larger text */
        text-transform: uppercase; /* More impact with uppercase */
        letter-spacing: 1.5px; /* Increased letter spacing */
        padding: 0.75rem 0.5rem;
        font-weight: 600; /* Bolder text */
        transition: all 0.3s ease;
        position: relative;

        /* Animated underline effect */
        &::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: var(--clr-accent-1);
          transition: width 0.3s ease;
        }

        &:hover {
          color: var(--clr-accent-1);
          transform: translateY(-2px); /* Slight lift effect */

          &::after {
            width: 100%; /* Expand underline on hover */
          }
        }

        /* Active page indicator */
        &.active {
          color: var(--clr-accent-1);
          font-weight: 700;

          &::after {
            width: 100%;
            height: 3px; /* Thicker underline for active page */
          }
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
`