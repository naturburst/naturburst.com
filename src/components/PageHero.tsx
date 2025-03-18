import React from 'react'
import styled from 'styled-components'

const PageHero: React.FC<{
  title: string | undefined
  isSingleProduct?: boolean
}> = ({ title }) => {
  return (
    <Wrapper>
      <div className='section-center'>
        <h2>{title}</h2>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background: #f7f7f7;
  width: 100%;
  padding: 2rem 0;
  text-align: center;

  h2 {
    color: #1a2e37;
    margin: 0;
    text-transform: capitalize;
    font-size: 2rem;
    font-weight: 700;
  }
`

export default PageHero