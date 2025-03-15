import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Product, getProductBySlug, getAllProductSlugs } from '@/data/products';
import { FiShoppingCart, FiHeart, FiShare2, FiChevronRight } from 'react-icons/fi';
import styles from '@/styles/ProductDetail.module.css';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  // Handle quantity changes
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // If page is still generating via SSG
  if (router.isFallback) {
    return <div className={styles.loading}>Loading...</div>;
  }

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
            {/* Product Images */}
            <motion.div
              className={styles.productImages}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.mainImage}>
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className={styles.thumbnails}>
                <div className={styles.thumbnailItem}>
                  <img src={product.imageUrl} alt={product.name} />
                </div>
                <div className={styles.thumbnailItem}>
                  <img src="/images/products/detail1.jpg" alt={`${product.name} detail`} />
                </div>
                <div className={styles.thumbnailItem}>
                  <img src="/images/products/detail2.jpg" alt={`${product.name} packaging`} />
                </div>
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
              {/* This would be dynamically generated based on related products */}
              <div className={styles.relatedProductCard}>
                <img src="/images/products/product2.jpg" alt="Related Product" />
                <h3>Berry Burst</h3>
                <span className={styles.relatedProductPrice}>$14.99</span>
              </div>

              <div className={styles.relatedProductCard}>
                <img src="/images/products/product3.jpg" alt="Related Product" />
                <h3>Citrus Delight</h3>
                <span className={styles.relatedProductPrice}>$13.99</span>
              </div>

              <div className={styles.relatedProductCard}>
                <img src="/images/products/product1.jpg" alt="Related Product" />
                <h3>Tropical Paradise Pack</h3>
                <span className={styles.relatedProductPrice}>$19.99</span>
              </div>
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

  return {
    props: {
      product
    },
    // Revalidate every hour
    revalidate: 3600
  };
};

export default ProductDetail;