import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/shop/ProductCard';
import { products } from '@/data/products';
import styles from '@/styles/Shop.module.css';

const Shop: React.FC = () => {
  // State for filter (potential future enhancement)
  const [filter, setFilter] = useState('all');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <Layout
      title="Shop | NatureBurst Tropi Treats"
      description="Browse our collection of premium freeze-dried fruit products. Natural, delicious and nutritious snacks."
    >
      <div className={styles.shopContainer}>
        <div className={styles.shopHeader}>
          <div className="container">
            <h1 className={styles.pageTitle}>Shop Our Products</h1>
            <p className={styles.pageDescription}>
              Discover our range of premium freeze-dried fruits - 100% natural,
              no additives, just pure fruit goodness in every bite.
            </p>
          </div>
        </div>

        <div className="container">
          <div className={styles.shopContent}>
            {/* Filter section - for future expansion */}
            <div className={styles.filterSection}>
              <h2>Product Categories</h2>
              <div className={styles.filterOptions}>
                <button
                  className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All Products
                </button>
                <button
                  className={`${styles.filterButton} ${filter === 'tropical' ? styles.active : ''}`}
                  onClick={() => setFilter('tropical')}
                >
                  Tropical Mix
                </button>
                <button
                  className={`${styles.filterButton} ${filter === 'berries' ? styles.active : ''}`}
                  onClick={() => setFilter('berries')}
                >
                  Berry Mix
                </button>
                <button
                  className={`${styles.filterButton} ${filter === 'citrus' ? styles.active : ''}`}
                  onClick={() => setFilter('citrus')}
                >
                  Citrus Mix
                </button>
              </div>

              <div className={styles.priceFilter}>
                <h3>Price Range</h3>
                <div className={styles.priceSlider}>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    defaultValue="30"
                    className={styles.slider}
                    id="priceRange"
                  />
                  <div className={styles.priceRange}>
                    <span>$0</span>
                    <span>$30</span>
                  </div>
                </div>
              </div>

              <div className={styles.attributeFilters}>
                <h3>Product Attributes</h3>
                <div className={styles.attributeOptions}>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" checked readOnly />
                    <span>No Added Sugar</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" checked readOnly />
                    <span>Gluten Free</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" checked readOnly />
                    <span>Vegan</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" checked readOnly />
                    <span>Non-GMO</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Products grid */}
            <div className={styles.productsSection}>
              <div className={styles.productsHeader}>
                <h2>All Products</h2>
                <div className={styles.sortOptions}>
                  <label htmlFor="sort">Sort by:</label>
                  <select id="sort" className={styles.sortSelect}>
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A-Z</option>
                  </select>
                </div>
              </div>

              <motion.div
                className={styles.productsGrid}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;