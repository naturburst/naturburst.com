import React from 'react'
import styled from 'styled-components'
import { useCurrencyContext, CurrencyCode } from '../context/currency_context'
import { FaMoneyBillWave } from 'react-icons/fa'

const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrencyContext()

  // Array of all supported currencies with their symbols
  const currencies = [
    { code: 'USD', symbol: '$', name: 'USD' },
    { code: 'INR', symbol: '₹', name: 'INR' },
    { code: 'GBP', symbol: '£', name: 'GBP' },
    { code: 'EUR', symbol: '€', name: 'EUR' }
  ]

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCurrency = e.target.value as CurrencyCode
    console.log('Currency selection changed to:', newCurrency) // Debug log
    setCurrency(newCurrency)
  }

  return (
    <Wrapper>
      <div className="currency-selector">
        <FaMoneyBillWave className="currency-icon" />
        <select
          value={currency}
          onChange={handleChange}
          className="currency-select"
        >
          {currencies.map(curr => (
            <option key={curr.code} value={curr.code}>
              {curr.symbol} {curr.name}
            </option>
          ))}
        </select>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-right: 1rem;

  .currency-selector {
    display: flex;
    align-items: center;
    position: relative;
  }

  .currency-icon {
    color: var(--clr-primary-1);
    margin-right: 0.5rem;
  }

  .currency-select {
    background: transparent;
    border: none;
    color: var(--clr-primary-1);
    font-size: 1rem;
    cursor: pointer;
    padding: 0.25rem;

    &:focus {
      outline: none;
    }

    option {
      background: var(--clr-white);
      color: var(--clr-grey-1);
    }
  }

  @media (max-width: 992px) {
    margin-right: 0;

    .currency-select {
      width: 85px; /* Make sure the dropdown is visible on mobile */
      font-size: 0.85rem;
    }
  }
`

export default CurrencySelector