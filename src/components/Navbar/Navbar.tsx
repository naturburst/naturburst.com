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
  background: linear-gradient(to right, var(--clr-primary-2), var(--clr-primary-4), var(--clr-accent-3));

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
    color: var(--clr-white);
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
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-white);
        font-size: 1.1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        font-weight: 500;
        &:hover {
          border-bottom: 2px solid var(--clr-accent-3);
          color: var(--clr-accent-3);
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
`