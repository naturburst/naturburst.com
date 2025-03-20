import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaHome, FaShoppingBag } from 'react-icons/fa'

const ErrorPage = () => {
  return (
    <Wrapper className='page-100'>
      <div className="error-content">
        <div className="error-code">404</div>
        <h1>Oops! Page Not Found</h1>
        <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>

        <div className="error-illustration">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200">
            <circle cx="250" cy="100" r="80" fill="#f8d7da" />
            <text x="250" y="120" fontSize="120" fontWeight="bold" fill="#e74c3c" textAnchor="middle">?</text>
          </svg>
        </div>

        <div className="buttons-container">
          <Link to='/' className='btn home-btn'>
            <FaHome className="btn-icon" /> Back to Home
          </Link>
          <Link to='/products' className='btn shop-btn'>
            <FaShoppingBag className="btn-icon" /> Go Shopping
          </Link>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;

  .error-content {
    background: white;
    padding: 3rem 2rem;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 100%;
  }

  .error-code {
    font-size: 6rem;
    font-weight: 900;
    color: var(--clr-primary-5);
    line-height: 1;
    margin-bottom: 1rem;
    text-shadow: 3px 3px 0 var(--clr-primary-9);
  }

  h1 {
    font-size: 2rem;
    color: var(--clr-grey-1);
    margin-bottom: 1.5rem;
  }

  p {
    color: var(--clr-grey-5);
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .error-illustration {
    max-width: 300px;
    margin: 0 auto 3rem;

    svg {
      width: 100%;
      height: auto;
    }
  }

  .buttons-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    min-width: 180px;

    .btn-icon {
      margin-right: 0.5rem;
    }
  }

  .home-btn {
    background: var(--clr-primary-5);

    &:hover {
      background: var(--clr-primary-3);
    }
  }

  .shop-btn {
    background: var(--clr-primary-5);

    &:hover {
      background: var(--clr-primary-3);
    }
  }

  @media (max-width: 576px) {
    .error-code {
      font-size: 4rem;
    }

    h1 {
      font-size: 1.5rem;
    }

    p {
      font-size: 1rem;
    }

    .buttons-container {
      flex-direction: column;

      .btn {
        width: 100%;
      }
    }
  }
`

export default ErrorPage