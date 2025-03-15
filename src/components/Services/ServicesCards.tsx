import React from 'react'
import { Link } from 'react-router-dom'
import { services } from '../../utils/constants'

// Simplified ServicesCards component that doesn't rely on filters
export const ServicesCards = () => {
  return (
    <div className='services-center'>
      {services.map(({ id, icon, title }) => {
        return (
          <article key={id} className='service'>
            <span className='icon'>{icon}</span>
            <h4>{title}</h4>
            <Link to='/products'>
              <button
                className='btn'
                type='button'
              >
                shop now
              </button>
            </Link>
          </article>
        )
      })}
    </div>
  )
}