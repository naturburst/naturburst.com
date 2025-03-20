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

// Styled component for the menu icon with improved mobile styling
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
  opacity: 0.85;

  svg {
    font-size: 1.3rem; // Reduced size from typical 2rem
  }

  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }

  @media (min-width: 992px) {
    display: none; // Hide on desktop
  }
`