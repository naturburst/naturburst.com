import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product } from '@/data/products';
import styles from '@/styles/components/ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      y: -10,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      className={styles.card}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <Link href={`/shop/${product.slug}`} className={styles.cardLink}>
        <div className={styles.imageContainer}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className={styles.productImage}
          />
          {product.inStock ? (
            <span className={styles.inStock}>In Stock</span>
          ) : (
            <span className={styles.outOfStock}>Out of Stock</span>
          )}
        </div>

        <div className={styles.cardContent}>
          <div className={styles.tags}>
            {product.ingredientsTags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>

          <h3 className={styles.productName}>{product.name}</h3>
          <p className={styles.productDescription}>{product.shortDescription}</p>

          <div className={styles.productMeta}>
            <span className={styles.productPrice}>${product.price.toFixed(2)}</span>
            <span className={styles.productWeight}>{product.weight}</span>
          </div>
        </div>
      </Link>

      <button className={styles.addToCartButton}>
        Add to Cart
      </button>
    </motion.div>
  );
};

export default ProductCard;