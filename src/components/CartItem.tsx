// src/components/CartItem.tsx
import React from 'react'
import styled from 'styled-components'
import { formatPrice, getPriceValue } from '../utils/helpers'
import AmountButtons from './AmountButtons'
import { FaTrash } from 'react-icons/fa'
import { cartType, useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'
import { useCurrencyContext } from '../context/currency_context'

const CartItem: React.FC<{ cartItem: cartType }> = ({ cartItem }) => {
  const { id, image, name, price, amount, slug, productReference } = cartItem
  // Extract current currency selection
  const { currency } = useCurrencyContext()
  const { removeItem, toggleAmount } = useCartContext()

  // Get the price in the current currency
  const priceInCurrency = getPriceValue(price, productReference, currency)
  
  const increase: () => void = () => {
    toggleAmount(id, 'inc')
  }
  const decrease: () => void = () => {
    toggleAmount(id, 'dec')
  }

  return (
    <Wrapper>
      {/* item column */}
      <div className='title'>
        <Link to={`/products/${slug}`}>
          <img src={image} alt={name} />
        </Link>
        <div>
          <h5 className='name'>{name}</h5>
          {/* Display price in user's selected currency */}
          <h5 className='price-small'>{formatPrice(priceInCurrency, undefined, currency)}</h5>
        </div>
      </div>
      {/* price column */}
      <div className='price'>{formatPrice(priceInCurrency, undefined, currency)}</div>
      {/* quantity column */}
      <AmountButtons amount={amount} increase={increase} decrease={decrease} />
      {/* subtotal column - calculate using the current currency price */}
      <h5 className='subtotal'>{formatPrice(priceInCurrency * amount, undefined, currency)}</h5>
      {/* remove icon */}
      <button
        type='button'
        className='remove-btn'
        onClick={() => removeItem(id)}
      >
        <FaTrash />
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  /* Existing styles... */
`

export default CartItem