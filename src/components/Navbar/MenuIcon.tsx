// src/components/Navbar/MenuIcon.tsx
import React from 'react'
import { FaBars } from 'react-icons/fa'
import { useProductsContext } from '../../context/products_context'
import styled from 'styled-components'

export const MenuIcon = () => {
  const { openSidebar } = useProductsContext()

  return (
    <IconWrapper type='button' className='nav-toggle' onClick={openSidebar} aria-label="Open menu">
      <FaBars />
    </IconWrapper>
  )
}

// Styled component for the menu icon with improved corner positioning
const IconWrapper = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  opacity: 0.9;
  position: absolute; // Position absolutely
  right: 15px;       // Position from right side
  top: 50%;          // Center vertically
  transform: translateY(-50%);

  svg {
    font-size: 1.5rem; // Slightly larger for better visibility
  }

  &:hover {
    opacity: 1;
    transform: translateY(-50%) scale(1.05);
  }

  /* On mobile, add a subtle background for better tap target */
  @media (max-width: 991px) {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    padding: 8px 10px;
  }

  @media (min-width: 992px) {
    display: none; /* Hide on desktop */
  }
`