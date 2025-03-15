import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import styles from '@/styles/Home.module.css';

const Home: React.FC = () => {
  // Animation variants for staggered section reveals
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <Layout>
      {/* Hero Section - Fresh Juice Banner */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Fresh Juice
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We Believe That Healthy Eating, Clean Air And Mental Clarity Are The Best Start To Genuine Wellbeing.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a href="/shop" className={styles.shopNowBtn}>Shop Now</a>
            </motion.div>
          </div>
          <div className={styles.heroImage}>
            {/* The juice bottle with fruits will be part of the background or a separate image */}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={styles.sectionSubtitle}>Services</h2>
            <h3 className={styles.sectionTitle}>Welcome To Organici</h3>
            <div className={styles.decorationLine}>
              <span className={styles.decorationIcon}>🍊</span>
            </div>
          </motion.div>

          <motion.div
            className={styles.servicesGrid}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className={styles.serviceCard} variants={itemVariants}>
              <div className={styles.serviceIcon}>
                <img src="/images/icons/grocery-bag.svg" alt="Always Fresh" />
              </div>
              <h3>Always Fresh</h3>
              <p>We care about what you eat and to produce food which nourishes.</p>
            </motion.div>

            <motion.div className={styles.serviceCard} variants={itemVariants}>
              <div className={styles.serviceIcon}>
                <img src="/images/icons/organic.svg" alt="100% Natural" />
              </div>
              <h3>100% Natural</h3>
              <p>We care about what you eat and to produce food which nourishes.</p>
            </motion.div>

            <motion.div className={styles.serviceCard} variants={itemVariants}>
              <div className={styles.serviceIcon}>
                <img src="/images/icons/quality.svg" alt="Best Quality" />
              </div>
              <h3>Best Quality</h3>
              <p>We care about what you eat and to produce food which nourishes.</p>
            </motion.div>

            <motion.div className={styles.serviceCard} variants={itemVariants}>
              <div className={styles.serviceIcon}>
                <img src="/images/icons/safety.svg" alt="Food Safety" />
              </div>
              <h3>Food Safety</h3>
              <p>We care about what you eat and to produce food which nourishes.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className={styles.productsSection}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={styles.sectionTitle}>Our Products</h2>
            <p className={styles.sectionDescription}>
              Discover our premium range of organic fruits and vegetables
            </p>
          </motion.div>

          <motion.div
            className={styles.productsGrid}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Product cards will be mapped here */}
            {[1, 2, 3, 4].map((item) => (
              <motion.div key={item} variants={itemVariants}>
                <div className={styles.productCard}>
                  <div className={styles.productImageContainer}>
                    <img src={`/images/products/product${item}.jpg`} alt={`Product ${item}`} />
                    <div className={styles.productBadge}>
                      {item % 2 === 0 ? 'Sale' : 'New'}
                    </div>
                  </div>
                  <div className={styles.productInfo}>
                    <h3>Organic Fruit Product</h3>
                    <p className={styles.productPrice}>$12.99</p>
                    <button className={styles.addToCartBtn}>Add to Cart</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className={styles.viewAllContainer}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <a href="/shop" className={styles.viewAllBtn}>View All Products</a>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section (from Image 3) */}
      <section className={styles.newsletterSection}>
        <div className="container">
          <div className={styles.newsletterContainer}>
            <div className={styles.brandLogos}>
              {/* Brand logos as shown in image 3 */}
              <img src="/images/logos/logo1.svg" alt="Summer Camping" />
              <img src="/images/logos/logo2.svg" alt="Vintage Spoon" />
              <img src="/images/logos/logo3.svg" alt="Mountain Climbing" />
              <img src="/images/logos/logo4.svg" alt="Travel Walking Dreams" />
              <img src="/images/logos/logo5.svg" alt="Outdoor Adventure" />
            </div>

            <div className={styles.newsletterSignup}>
              <h2>
                <span className={styles.newsletterIcon}>✉️</span>
                Sign Up For Newsletter
              </h2>
              <div className={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="email@example.com"
                  aria-label="Email for newsletter"
                />
                <button type="submit" className={styles.subscribeBtn}>Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;