import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Product, getProductBySlug, getAllProductSlugs, products } from '@/data/products';
import { FiShoppingCart, FiHeart, FiShare2, FiChevronRight } from 'react-icons/fi';
import styles from '@/styles/ProductDetail.module.css';

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, relatedProducts }) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  // State to track selected image for the main display
  const [selectedImage, setSelectedImage] = useState(product.images.main);

  // Handle quantity changes
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Handler for thumbnail click
  const handleThumbnailClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  // If page is still generating via SSG
  if (router.isFallback) {
    return <div className={styles.loading}>Loading...</div>;
  }

  // Combine main image and gallery images for the thumbnails
  const allImages = [product.images.main, ...product.images.gallery];

  return (
    <Layout
      title={`${product.name} | NatureBurst`}
      description={product.shortDescription}
    >
      <div className={styles.productDetailContainer}>
        <div className="container">
          {/* Breadcrumb navigation */}
          <div className={styles.breadcrumbs}>
            <a href="/">Home</a>
            <FiChevronRight />
            <a href="/shop">Shop</a>
            <FiChevronRight />
            <span>{product.name}</span>
          </div>

          <div className={styles.productContent}>
            {/* Product Images with Gallery */}
            <motion.div
              className={styles.productImages}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.mainImage}>
                {/* Display the currently selected image */}
                <img src={selectedImage} alt={product.name} />
              </div>

              <div className={styles.thumbnails}>
                {/* Map through all images to create thumbnails */}
                {allImages.map((image, index) => (
                  <div
                    key={index}
                    className={`${styles.thumbnailItem} ${selectedImage === image ? styles.active : ''}`}
                    onClick={() => handleThumbnailClick(image)}
                  >
                    <img src={image} alt={`${product.name} - view ${index + 1}`} />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              className={styles.productInfo}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className={styles.productName}>{product.name}</h1>

              <div className={styles.productPrice}>
                ${product.price.toFixed(2)}
                <span className={styles.productWeight}>{product.weight}</span>
              </div>

              <div className={styles.tags}>
                {product.ingredientsTags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <p className={styles.productDescription}>{product.description}</p>

              <div className={styles.productBenefits}>
                <h3>Benefits</h3>
                <ul>
                  {product.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.addToCartSection}>
                <div className={styles.quantityControl}>
                  <button onClick={decreaseQuantity}>-</button>
                  <span>{quantity}</span>
                  <button onClick={increaseQuantity}>+</button>
                </div>

                <button className={styles.addToCartButton}>
                  <FiShoppingCart size={18} />
                  Add to Cart
                </button>

                <button className={styles.wishlistButton}>
                  <FiHeart size={18} />
                </button>
              </div>

              {product.inStock ? (
                <div className={styles.inStock}>In Stock & Ready to Ship</div>
              ) : (
                <div className={styles.outOfStock}>Out of Stock</div>
              )}

              <div className={styles.shareProduct}>
                <FiShare2 size={18} />
                <span>Share this product</span>
                <div className={styles.socialIcons}>
                  <a href="#" aria-label="Share on Facebook">F</a>
                  <a href="#" aria-label="Share on Twitter">T</a>
                  <a href="#" aria-label="Share on Pinterest">P</a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Additional Product Details Tabs */}
          <div className={styles.productTabs}>
            <div className={styles.tabHeaders}>
              <button className={styles.activeTab}>Description</button>
              <button>Nutrition Facts</button>
              <button>How to Use</button>
              <button>Reviews</button>
            </div>

            <div className={styles.tabContent}>
              <div className={styles.descriptionTab}>
                <h3>Product Description</h3>
                <p>
                  {product.description}
                </p>
                <p>
                  Our freeze-drying process locks in the flavors and nutrients of fresh fruits
                  at their peak ripeness. Unlike conventional drying methods, freeze-drying
                  preserves the cellular structure of the fruit, maintaining its natural
                  appearance and nutritional value.
                </p>
                <h4>What makes our process special?</h4>
                <ul>
                  <li>We freeze the fresh fruit to -40°F (-40°C)</li>
                  <li>The frozen water is removed through sublimation under vacuum</li>
                  <li>This gentle process preserves the fruit's structure, flavor, and nutrients</li>
                  <li>No need for additives, preservatives, or added sugar</li>
                  <li>Results in a lightweight, shelf-stable product that retains up to 97% of nutrients</li>
                </ul>
                <p>
                  Each batch is carefully inspected to ensure only the highest quality product reaches our customers.
                </p>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className={styles.relatedProducts}>
            <h2>You Might Also Like</h2>
            <div className={styles.relatedProductsGrid}>
              {relatedProducts.map((relatedProduct) => (
                <a
                  key={relatedProduct.id}
                  href={`/shop/${relatedProduct.slug}`}
                  className={styles.relatedProductCard}
                >
                  <img src={relatedProduct.images.main} alt={relatedProduct.name} />
                  <h3>{relatedProduct.name}</h3>
                  <span className={styles.relatedProductPrice}>${relatedProduct.price.toFixed(2)}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Generate paths at build time
export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllProductSlugs();

  const paths = slugs.map((slug) => ({
    params: { slug }
  }));

  return {
    paths,
    fallback: false
  };
};

// Fetch data for each path
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const product = getProductBySlug(slug);

  // If product not found, return 404
  if (!product) {
    return {
      notFound: true
    };
  }

  // Get related products (simple implementation - excluding current product)
  const relatedProducts = products
    .filter(p => p.id !== product.id)
    .slice(0, 3);

  return {
    props: {
      product,
      relatedProducts
    },
    // Revalidate every hour
    revalidate: 3600
  };
};

export default ProductDetail;