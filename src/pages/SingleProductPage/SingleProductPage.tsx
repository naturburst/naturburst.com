import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProductsContext } from '../../context/products_context'
import { Loading } from '../../components'
import styled from 'styled-components'
import { SingleProductContent } from './SingleProductContent'
import ErrorPage from '../ErrorPage'
import { FaArrowLeft } from 'react-icons/fa'

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

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (singleProductLoading) {
    return <Loading />
  }

  if (singleProductError) {
    return <ErrorPage />
  }

  return (
    <Wrapper>
      <div className='back-link'>
        <Link to='/products'>
          <FaArrowLeft /> Back to products
        </Link>
      </div>

      <div className='product-container'>
        <div className='product-image'>
          {images && images.length > 0 && (
            <img src={images[0]} alt={name} />
          )}
        </div>

        <div className='product-content'>
          <SingleProductContent />
        </div>
      </div>

      <div className="related-products">
        <h2>You May Also Like</h2>
        <div className="related-grid">
          {allProducts.filter(product => product.slug !== slug).map((product, index) => (
            index < 3 && (
              <div key={product.id} className="related-product">
                <Link to={`/products/${product.slug}`}>
                  <div className="related-img-container">
                    <img src={product.images[0]} alt={product.name} />
                  </div>
                  <h4>{product.name}</h4>
                </Link>
              </div>
            )
          ))}
        </div>
      </div>
    </Wrapper>
  )
}

export default SingleProductPage

const Wrapper = styled.main`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;

  .back-link {
    max-width: 1200px;
    margin: 0 auto 2rem;

    a {
      display: inline-flex;
      align-items: center;
      color: #666;
      font-weight: 500;
      transition: all 0.3s ease;

      svg {
        margin-right: 0.5rem;
      }

      &:hover {
        color: #40CEB5;
      }
    }
  }

  .product-container {
    display: grid;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .product-image {
    background: #f7f7f7;
    border-radius: 8px;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-width: 100%;
      max-height: 400px;
      object-fit: contain;
    }
  }

  .related-products {
    margin-top: 4rem;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;

    h2 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      color: #1a2e37;
    }

    .related-grid {
      display: grid;
      gap: 1.5rem;
    }

    .related-product {
      background: white;
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      overflow: hidden;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      }

      .related-img-container {
        background: #f7f7f7;
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 180px;

        img {
          max-width: 85%;
          max-height: 85%;
          object-fit: contain;
        }
      }

      h4 {
        padding: 1rem;
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
        color: #1a2e37;
      }
    }
  }

  @media (min-width: 768px) {
    .product-container {
      grid-template-columns: 1fr 1fr;
    }

    .related-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 1400px) {
    .product-container {
      max-width: 100%;
      grid-template-columns: 40% 60%;
    }
  }

  @media (max-width: 767px) {
    padding: 1rem;

    .related-grid {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }

    .product-image {
      padding: 1rem;

      img {
        max-height: 250px;
      }
    }
  }
`