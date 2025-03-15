import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Product, getProductBySlug, getAllProductSlugs, products } from '@/data/products';
import { FaHome, FaShareAlt, FaRegHeart, FaFacebookF, FaTwitter, FaPinterestP, FaInstagram } from 'react-icons/fa';
import { RiFileListLine } from 'react-icons/ri';
import styles from '@/styles/ProductDetail.module.css';

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  // State for selected image, quantity, and options
  const [selectedImage, setSelectedImage] = useState(product.images.main);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('M');
  const [color, setColor] = useState('white');

  // Handler for thumbnail click
  const handleThumbnailClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  // Combine main image and gallery images for thumbnails
  const allImages = [product.images.main, ...product.images.gallery];

  return (
    <Layout>
      <div className={styles.productDetailContainer}>
        {/* Product page header with title and breadcrumbs */}
        <div className={styles.productHeader}>
          <div className="container">
            <h1>{product.name}</h1>
            <div className={styles.breadcrumbs}>
              <Link href="/">
                <span className={styles.breadcrumbLink}>
                  <FaHome /> Home
                </span>
              </Link>
              <span className={styles.breadcrumbSeparator}>&gt;</span>
              <span className={styles.currentPage}>{product.name}</span>
            </div>
          </div>
        </div>

        <div className="container">
          <div className={styles.productContent}>
            {/* Left side: Product image gallery */}
            <div className={styles.productGallery}>
              {/* Vertical thumbnails */}
              <div className={styles.thumbnailsVertical}>
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

              {/* Main image */}
              <div className={styles.mainImageContainer}>
                <img src={selectedImage} alt={product.name} />
              </div>
            </div>

            {/* Right side: Product details */}
            <div className={styles.productInfo}>
              <h1>{product.name}</h1>
              <p className={styles.productDescription}>{product.description}</p>

              <div className={styles.productReview}>
                <Link href="#reviews">
                  <span className={styles.reviewLink}>
                    <RiFileListLine /> Write a review
                  </span>
                </Link>
              </div>

              <div className={styles.productPrice}>
                ${product.price.toFixed(2)}
              </div>

              <div className={styles.productMeta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Brand :</span>
                  <span className={styles.metaValue}>Printed</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Availability :</span>
                  <span className={styles.metaValue}>
                    {product.inStock ? 'In Stock' : 'Out Of Stock'}
                  </span>
                </div>
              </div>

              {/* Product options */}
              <div className={styles.productOptions}>
                <div className={styles.optionGroup}>
                  <label>Size</label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className={styles.optionSelect}
                  >
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </div>

                <div className={styles.optionGroup}>
                  <label>Color</label>
                  <select
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className={styles.optionSelect}
                  >
                    <option value="white">white</option>
                    <option value="black">black</option>
                    <option value="green">green</option>
                  </select>
                </div>
              </div>

              {/* Action buttons */}
              <div className={styles.productActions}>
                <button className={styles.shareButton}>
                  <FaShareAlt /> Share
                </button>

                {product.inStock ? (
                  <button className={styles.addToCartButton}>
                    Add to Cart
                  </button>
                ) : (
                  <button className={styles.soldOutButton} disabled>
                    Sold Out
                  </button>
                )}

                <button className={styles.notifyButton}>
                  Notify Me
                </button>
              </div>

              {/* Additional actions */}
              <div className={styles.additionalActions}>
                <button className={styles.wishlistButton}>
                  <FaRegHeart /> Wishlist
                </button>
                <button className={styles.compareButton}>
                  Compare
                </button>
                <button className={styles.sizeGuideButton}>
                  Size Guide
                </button>
                <button className={styles.printButton}>
                  Print
                </button>
              </div>

              {/* Social sharing */}
              <div className={styles.socialSharing}>
                <Link href="#" className={styles.socialIcon}><FaFacebookF /></Link>
                <Link href="#" className={styles.socialIcon}><FaTwitter /></Link>
                <Link href="#" className={styles.socialIcon}><FaPinterestP /></Link>
                <Link href="#" className={styles.socialIcon}><FaInstagram /></Link>
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