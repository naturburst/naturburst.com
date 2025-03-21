// src/pages/SingleProductPage/SingleProductPage.tsx
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProductsContext } from '../../context/products_context'
import { Loading } from '../../components'
import styled from 'styled-components'
import { SingleProductContent } from './SingleProductContent'
import ErrorPage from '../ErrorPage'
import { FaArrowLeft } from 'react-icons/fa'
import { shopifyClient } from '../../utils/shopify-config'
import { ShopifyProduct, getVariantId } from '../../utils/shopify-product-utils'

// Define interface for product option to fix TypeScript errors
interface ProductOption {
  name: string;
  values: string[];
}

// Adapter function to convert Shopify SDK Product to our ShopifyProduct interface
const adaptShopifyProduct = (sdkProduct: any): ShopifyProduct => {
  // Map SDK product to our interface, handling type differences
  return {
    id: sdkProduct.id,
    title: sdkProduct.title,
    handle: sdkProduct.handle,
    vendor: sdkProduct.vendor,
    productType: sdkProduct.productType,
    description: sdkProduct.description || '',
    descriptionHtml: sdkProduct.descriptionHtml || '',

    // Convert number amounts to strings
    priceRange: {
      minVariantPrice: {
        amount: String(sdkProduct.priceRange.minVariantPrice.amount),
        currencyCode: sdkProduct.priceRange.minVariantPrice.currencyCode
      },
      maxVariantPrice: {
        amount: String(sdkProduct.priceRange.maxVariantPrice.amount),
        currencyCode: sdkProduct.priceRange.maxVariantPrice.currencyCode
      }
    },

    // Handle optional compareAtPriceRange
    compareAtPriceRange: sdkProduct.compareAtPriceRange ? {
      minVariantPrice: {
        amount: String(sdkProduct.compareAtPriceRange.minVariantPrice.amount),
        currencyCode: sdkProduct.compareAtPriceRange.minVariantPrice.currencyCode
      },
      maxVariantPrice: {
        amount: String(sdkProduct.compareAtPriceRange.maxVariantPrice.amount),
        currencyCode: sdkProduct.compareAtPriceRange.maxVariantPrice.currencyCode
      }
    } : null,

    // Map variants with proper type conversion
    variants: sdkProduct.variants.map((variant: any) => ({
      id: variant.id,
      title: variant.title,
      price: String(variant.price),
      compareAtPrice: variant.compareAtPrice ? String(variant.compareAtPrice) : null,
      available: variant.available,
      sku: variant.sku || '',
      weight: variant.weight || 0,
      weightUnit: variant.weightUnit || 'g',
      image: variant.image,
      selectedOptions: variant.selectedOptions || []
    })),

    // Map other properties
    images: sdkProduct.images,
    options: sdkProduct.options,
    tags: sdkProduct.tags,
    metafields: sdkProduct.metafields || null,
    availableForSale: sdkProduct.availableForSale
  };
};

const SingleProductPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const {
    singleProduct,
    fetchSingleProduct,
    singleProductLoading,
    singleProductError,
    allProducts,
  } = useProductsContext()

  // State for Shopify product and variant selection
  const [shopifyProduct, setShopifyProduct] = useState<ShopifyProduct | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null)

  // Fetch raw Shopify product data for variant information
  useEffect(() => {
    const fetchShopifyProduct = async () => {
      try {
        if (slug) {
          // Fetch product from Shopify API
          const sdkProduct = await shopifyClient.product.fetchByHandle(slug)

          // Convert to our ShopifyProduct interface
          const adaptedProduct = adaptShopifyProduct(sdkProduct)
          setShopifyProduct(adaptedProduct)

          // Initialize selected options with default values
          if (adaptedProduct && adaptedProduct.options) {
            const initialOptions: Record<string, string> = {}

            adaptedProduct.options.forEach((option: ProductOption) => {
              if (option.values.length > 0) {
                initialOptions[option.name] = option.values[0]
              }
            })

            setSelectedOptions(initialOptions)

            // Set initial variant ID based on selected options
            const variantId = getVariantId(adaptedProduct, initialOptions)
            setSelectedVariantId(variantId)
          }
        }
      } catch (error) {
        console.error('Error fetching Shopify product:', error)
      }
    }

    fetchShopifyProduct()
  }, [slug])

  // Fetch app-specific product data
  useEffect(() => {
    if (slug) {
      fetchSingleProduct(slug)
    }
  }, [slug, allProducts, fetchSingleProduct])

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Update selected variant when options change
  const handleOptionChange = (optionName: string, value: string) => {
    const newOptions = { ...selectedOptions, [optionName]: value }
    setSelectedOptions(newOptions)

    if (shopifyProduct) {
      const variantId = getVariantId(shopifyProduct, newOptions)
      setSelectedVariantId(variantId)
    }
  }

  if (singleProductLoading) {
    return <Loading />
  }

  if (singleProductError) {
    return <ErrorPage />
  }

  const { name, images } = { ...singleProduct }

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
          <SingleProductContent
            shopifyProduct={shopifyProduct}
            selectedOptions={selectedOptions}
            selectedVariantId={selectedVariantId}
            onOptionChange={handleOptionChange}
          />
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
        color: #2A9D8F;
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