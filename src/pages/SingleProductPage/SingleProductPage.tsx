import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useProductsContext } from '../../context/products_context'
import { ProductImages, Loading, PageHero } from '../../components'
import styled from 'styled-components'
import { BackToProductsButton } from './BackToProductsButton'
import { SingleProductContent } from './SingleProductContent'
import ErrorPage from '../ErrorPage'

const SingleProductPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const {
    singleProduct,
    fetchSingleProduct,
    singleProductLoading,
    singleProductError,
    allProducts,
  } = useProductsContext()

  const { name, images } = { ...singleProduct }

  // When page refreshes or allProducts changes, fetch the single product
  useEffect(() => {
    if (slug) {
      fetchSingleProduct(slug)
    }
    // eslint-disable-next-line
  }, [slug, allProducts])

  if (singleProductLoading) {
    return <Loading />
  }

  if (singleProductError) {
    return <ErrorPage />
  }

  return (
    <Wrapper>
      <PageHero title={name} isSingleProduct />
      <div className='section section-center page'>
        <BackToProductsButton />
        <div className='product-center'>
          <div className='product-img-container'>
            <ProductImages images={images} />
          </div>
          <div className='product-content-container'>
            <SingleProductContent />
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default SingleProductPage

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 2rem;
    margin-top: 2rem;
  }

  .product-img-container {
    width: 100%;
    height: auto;
  }

  .product-content-container {
    width: 100%;
  }

  .price {
    color: var(--clr-primary-5);
  }

  .desc {
    line-height: 1.8;
    max-width: 45em;
    &:first-letter {
      text-transform: capitalize;
    }
  }

  .info {
    width: 300px;
    display: grid;
    grid-template-columns: 180px 1fr;
    margin-bottom: 1.25rem;
    &:first-letter {
      text-transform: capitalize;
    }
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: start;
    }

    .price {
      font-size: 1.25rem;
    }
  }
`