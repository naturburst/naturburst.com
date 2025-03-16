import React from 'react'
import whiteLogo from '../../assets/logo_white.jpg'
import { Link } from 'react-router-dom'

export const Logo = () => {
  return (
    <Link to='/'>
      <img src={whiteLogo} alt='Natureburst' />
    </Link>
  )
}
