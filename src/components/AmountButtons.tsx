import React from 'react'
import styled from 'styled-components'
import { FaPlus, FaMinus } from 'react-icons/fa'

const AmountButtons: React.FC<{
  amount: number
  increase: () => void
  decrease: () => void
}> = ({ amount, increase, decrease }) => {
  return (
    <Wrapper className='amount-btns'>
      <button type='button' className='amount-btn' onClick={decrease} aria-label="Decrease quantity">
        <FaMinus />
      </button>
      <h2 className='amount'>{amount}</h2>
      <button type='button' className='amount-btn' onClick={increase} aria-label="Increase quantity">
        <FaPlus />
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--clr-grey-8);
  border-radius: 30px;
  padding: 0.25rem;

  h2 {
    margin: 0;
    width: 2.5rem;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 700;
  }

  button {
    background: var(--clr-grey-10);
    border: none;
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    svg {
      font-size: 0.8rem;
      color: var(--clr-grey-1);
    }

    &:hover {
      background: var(--clr-primary-5);

      svg {
        color: white;
      }
    }
  }
`

export default AmountButtons