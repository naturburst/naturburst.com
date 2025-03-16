// src/pages/HomePage.tsx
import React from 'react'
import { Hero, Services, FeaturedProducts } from '../components'

const HomePage = () => {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Services />
    </main>
  )
}

export default HomePage