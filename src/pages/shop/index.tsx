import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { products } from '@/data/products';
import Link from 'next/link';
import { FaHome, FaList, FaThLarge, FaBars } from 'react-icons/fa';
import styles from '@/styles/Shop.module.css';

// Product category and filter interfaces
interface FilterState {
  availability: string[];
  priceRange: {
    min: number;
    max: number;
  };
  color: string[];
}

const Catalog: React.FC = () => {
  // State for grid/list view, filters, sorting and products per page
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'compact'>('grid');
  const [sortBy, setSortBy] = useState('best-selling');
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    availability: [],
    priceRange: {
      min: 0,
      max: 1500
    },
    color: []
  });

  // Toggle availability filter
  const handleAvailabilityChange = (value: string) => {
    setFilters(prev => {
      const exists = prev.availability.includes(value);
      return {
        ...prev,
        availability: exists
          ? prev.availability.filter(item => item !== value)
          : [...prev.availability, value]
      };
    });
  };

  // Toggle color filter
  const handleColorChange = (value: string) => {
    setFilters(prev => {
      const exists = prev.color.includes(value);
      return {
        ...prev,
        color: exists
          ? prev.color.filter(item => item !== value)
          : [...prev.color, value]
      };
    });
  };

  // Handle price range change
  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseFloat(value) || 0;
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: numValue
      }
    }));
  };

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <Layout>
      {/* Category Header */}
      <div className={styles.categoryHeader}>
        <div className="container">
          <h1>Grocery</h1>
          <div className={styles.breadcrumbs}>
            <Link href="/">
              <span className={styles.breadcrumbLink}>
                <FaHome /> Home
              </span>
            </Link>
            <span className={styles.breadcrumbSeparator}>&gt;</span>
            <span className={styles.currentPage}>Grocery</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.catalogContainer}>
          {/* Sidebar Filters */}
          <aside className={styles.sidebar}>
            {/* Categories */}
            <div className={styles.filterSection}>
              <h2>Categories</h2>
              <ul className={styles.categoryList}>
                <li>
                  <Link href="/catalog" className={styles.categoryItem}>
                    Home
                    <span className={styles.expandIcon}>+</span>
                  </Link>
                </li>
                <li>
                  <Link href="/catalog" className={styles.categoryItem}>
                    Collection
                  </Link>
                </li>
                <li>
                  <Link href="/catalog" className={styles.categoryItem}>
                    Shop
                  </Link>
                </li>
              </ul>
            </div>

            {/* Availability Filter */}
            <div className={styles.filterSection}>
              <h2>Availability</h2>
              <div className={styles.checkboxGroup}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={filters.availability.includes('in-stock')}
                    onChange={() => handleAvailabilityChange('in-stock')}
                  />
                  <span className={styles.checkboxLabel}>In Stock (11)</span>
                </label>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={filters.availability.includes('out-of-stock')}
                    onChange={() => handleAvailabilityChange('out-of-stock')}
                  />
                  <span className={styles.checkboxLabel}>Out Of Stock (3)</span>
                </label>
              </div>
            </div>

            {/* Price Range Filter */}
            <div className={styles.filterSection}>
              <h2>Price</h2>
              <div className={styles.priceRangeInputs}>
                <div className={styles.priceInput}>
                  <span>$</span>
                  <input
                    type="number"
                    placeholder="From"
                    value={filters.priceRange.min}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                  />
                </div>
                <div className={styles.priceInput}>
                  <span>$</span>
                  <input
                    type="number"
                    placeholder="To"
                    value={filters.priceRange.max}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Color Filter */}
            <div className={styles.filterSection}>
              <h2>Color</h2>
              <div className={styles.checkboxGroup}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={filters.color.includes('black')}
                    onChange={() => handleColorChange('black')}
                  />
                  <span className={styles.checkboxColor} style={{ backgroundColor: '#000' }}></span>
                  <span className={styles.checkboxLabel}>Black (3)</span>
                </label>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={filters.color.includes('blue')}
                    onChange={() => handleColorChange('blue')}
                  />
                  <span className={styles.checkboxColor} style={{ backgroundColor: '#0000FF' }}></span>
                  <span className={styles.checkboxLabel}>Blue (3)</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className={styles.catalogContent}>
            {/* Banner */}
            <div className={styles.catalogBanner}>
              <img src="/images/catalog/grocery-banner.jpg" alt="Buy natural, Eat natural" />
            </div>

            {/* Category description */}
            <div className={styles.categoryDescription}>
              <h2>Grocery</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu felis nec neque commodo tempus. Quisque fringilla semper velit nec congue. Sed sit amet euismod tellus. Fusce vel metus mattis, bibendum eros et, congue neque.
              </p>
            </div>

            {/* Catalog toolbar */}
            <div className={styles.catalogToolbar}>
              <div className={styles.viewModes}>
                <button
                  className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <FaThLarge />
                </button>
                <button
                  className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <FaList />
                </button>
                <button
                  className={`${styles.viewButton} ${viewMode === 'compact' ? styles.active : ''}`}
                  onClick={() => setViewMode('compact')}
                  aria-label="Compact view"
                >
                  <FaBars />
                </button>
              </div>

              <div className={styles.sortOptions}>
                <div className={styles.itemsPerPage}>
                  <span>Show:</span>
                  <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
                    <option value={8}>8</option>
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={48}>48</option>
                  </select>
                </div>

                <div className={styles.sortBy}>
                  <span>Sort By:</span>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="best-selling">Best selling</option>
                    <option value="price-asc">Price, low to high</option>
                    <option value="price-desc">Price, high to low</option>
                    <option value="name-asc">Alphabetically, A-Z</option>
                    <option value="name-desc">Alphabetically, Z-A</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <motion.div
              className={`${styles.productsGrid} ${styles[viewMode]}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  className={styles.productCard}
                  variants={itemVariants}
                >
                  <div className={styles.productCheckbox}>
                    <input type="checkbox" aria-label={`Select ${product.name}`} />
                  </div>
                  <Link href={`/shop/${product.slug}`} className={styles.productLink}>
                    <div className={styles.productImage}>
                      <img src={product.images.main} alt={product.name} />
                    </div>
                    <div className={styles.productInfo}>
                      <h3>{product.name}</h3>
                      <div className={styles.productPrice}>${product.price.toFixed(2)}</div>
                      <div className={styles.productButtons}>
                        <button className={styles.addToCartBtn}>Add to Cart</button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            <div className={styles.pagination}>
              <button className={`${styles.pageButton} ${styles.active}`}>1</button>
              <button className={styles.pageButton}>2</button>
              <button className={styles.pageButton}>3</button>
              <button className={`${styles.pageButton} ${styles.nextPage}`}>
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Catalog;