// src/components/Navbar/MenuIcon.tsx
import React from 'react'
import { FaBars } from 'react-icons/fa'
import { useProductsContext } from '../../context/products_context'
import styled from 'styled-components'

export const MenuIcon = () => {
  // Use toggleSidebar instead of openSidebar
  const { toggleSidebar, isSidebarOpen } = useProductsContext()

  return (
    <IconWrapper
      type='button'
      className={`nav-toggle ${isSidebarOpen ? 'active' : ''}`}
      onClick={toggleSidebar}
      aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
    >
      <FaBars />
    </IconWrapper>
  )
}

const IconWrapper = styled.button`
  /* Common styles */
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  /* Desktop styles - hidden */
  @media (min-width: 992px) {
    display: none;
  }

  /* Mobile styles - positioned to the left */
  @media (max-width: 991px) {
    position: absolute;
    left: 0;           /* Leftmost positioning */
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    margin: 0;
    z-index: 10;
    background: transparent;

    svg {
      font-size: 1.75rem; /* Larger icon as shown in screenshot */
    }

    &.active {
      color: var(--clr-primary-10); /* Visual indicator when sidebar is open */
    }
  }
`