import React from 'react'
import whiteLogo from '../../assets/hero.jpg'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Logo = () => {
  return (
    <LogoWrapper to='/'>
      <img src={whiteLogo} alt='Natureburst' />
    </LogoWrapper>
  )
}

// Styled component for the logo container ensures consistent vertical alignment
const LogoWrapper = styled(Link)`
  height: 100%;
  display: flex;
  align-items: center;

  img {
    display: block; /* Eliminates default inline element spacing */
    max-height: 100%;
    width: auto;
    object-fit: contain; /* Ensure logo maintains proportions */
  }

  /* Mobile-specific styling */
  @media (max-width: 991px) {
    max-width: 100%; /* Limit width on mobile */

    img {
      object-position: left; /* Align to the left */
    }
  }
`