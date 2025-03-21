// src/components/Navbar/Logo.tsx
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

const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: auto;
    object-fit: contain;
  }

  /* Mobile styling - centered and larger */
  @media (max-width: 991px) {
    position: absolute; /* Position absolutely for perfect centering */
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%); /* Perfect centering technique */

    img {
      max-height: 60px; /* Adjust height to match screenshot */
      width: 120px;
    }
  }

  /* Desktop styling */
  @media (min-width: 992px) {
    height: 100%;

    img {
      width: 240px;
      max-height: 90px;
    }
  }
`