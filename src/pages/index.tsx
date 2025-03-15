import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/ui/Hero';
import ProductCard from '@/components/shop/ProductCard';
import { products } from '@/data/products';
import styles from '@/styles/Home.module.css';

const Home: React.FC = () => {
  // Animation for sections
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
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Why Choose NatureBurst
          </motion.h2>

          <motion.div
            className={styles.featuresGrid}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className={styles.featureCard} variants={itemVariants}>
              <div className={styles.featureIcon}>
                <img src="/images/icons/natural.svg" alt="100% Natural" />
              </div>
              <h3>100% Natural</h3>
              <p>Our products contain only natural fruits with no added sugars, preservatives, or artificial flavors.</p>
            </motion.div>

            <motion.div className={styles.featureCard} variants={itemVariants}>
              <div className={styles.featureIcon}>
                <img src="/images/icons/nutrients.svg" alt="Nutrient Rich" />
              </div>
              <h3>Nutrient Rich</h3>
              <p>Freeze-drying preserves up to 97% of the nutrients found in fresh fruits, keeping all the goodness intact.</p>
            </motion.div>

            <motion.div className={styles.featureCard} variants={itemVariants}>
              <div className={styles.featureIcon}>
                <img src="/images/icons/shelf-life.svg" alt="Long Shelf Life" />
              </div>
              <h3>Long Shelf Life</h3>
              <p>Enjoy the taste of fresh fruits anytime with our products that stay fresh for up to two years.</p>
            </motion.div>

            <motion.div className={styles.featureCard} variants={itemVariants}>
              <div className={styles.featureIcon}>
                <img src="/images/icons/taste.svg" alt="Amazing Taste" />
              </div>
              <h3>Amazing Taste</h3>
              <p>Experience intense fruit flavors in a satisfying crunchy texture that melts in your mouth.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className={styles.productsSection}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title">Our Tropi Treats Collection</h2>
            <p className={styles.sectionDescription}>
              Discover our premium range of freeze-dried tropical fruits,
              packed with flavor and nutrients
            </p>
          </motion.div>

          <motion.div
            className={styles.productsGrid}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {products.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
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
            <a href="/shop" className="btn btn-primary">View All Products</a>
          </motion.div>
        </div>
      </section>

      {/* Benefits & How to Use Section */}
      <section className={styles.benefitsSection}>
        <div className="container">
          <div className={styles.benefitsContainer}>
            <motion.div
              className={styles.benefitsContent}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>Healthy Snacking Made Easy</h2>
              <p>
                NatureBurst freeze-dried fruits offer a convenient way to enjoy the benefits of
                fresh fruits without the hassle. Perfect for on-the-go snacking, lunch boxes,
                or as a guilt-free treat.
              </p>

              <h3>Ways to Enjoy</h3>
              <ul className={styles.benefitsList}>
                <li>Enjoy straight from the bag as a crunchy snack</li>
                <li>Add to your morning yogurt or oatmeal</li>
                <li>Blend into smoothies for natural flavor</li>
                <li>Use as colorful, flavorful toppings for desserts</li>
                <li>Mix with nuts and dark chocolate for a trail mix</li>
              </ul>

              <a href="/about" className="btn btn-secondary">Learn More</a>
            </motion.div>

            <motion.div
              className={styles.benefitsImage}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/images/lifestyle-image.jpg"
                alt="Ways to enjoy NatureBurst products"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What Our Customers Say
          </motion.h2>

          <motion.div
            className={styles.testimonialsGrid}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div className={styles.testimonialCard} variants={itemVariants}>
              <div className={styles.testimonialText}>
                <p>
                  "I love keeping these in my desk at work. They're the perfect healthy snack
                  that satisfies my sweet cravings without the guilt. The Tropi Mix is my absolute favorite!"
                </p>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>
                  <img src="/images/testimonials/avatar1.jpg" alt="Sarah K." />
                </div>
                <div>
                  <h4>Sarah K.</h4>
                  <p>Verified Customer</p>
                </div>
              </div>
            </motion.div>

            <motion.div className={styles.testimonialCard} variants={itemVariants}>
              <div className={styles.testimonialText}>
                <p>
                  "My kids absolutely adore these treats. It's so much better than giving them
                  candy or processed snacks. The Berry Burst is their favorite and mine too!"
                </p>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>
                  <img src="/images/testimonials/avatar2.jpg" alt="Michael T." />
                </div>
                <div>
                  <h4>Michael T.</h4>
                  <p>Verified Customer</p>
                </div>
              </div>
            </motion.div>

            <motion.div className={styles.testimonialCard} variants={itemVariants}>
              <div className={styles.testimonialText}>
                <p>
                  "I add these to my yogurt every morning for breakfast. The flavor is incredible
                  and I love that there's no added sugar. Will definitely be ordering more!"
                </p>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>
                  <img src="/images/testimonials/avatar3.jpg" alt="Jessica R." />
                </div>
                <div>
                  <h4>Jessica R.</h4>
                  <p>Verified Customer</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={styles.newsletterSection}>
        <div className="container">
          <motion.div
            className={styles.newsletterContainer}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Join Our Fruit Family</h2>
            <p>
              Subscribe to our newsletter for exclusive offers, new product announcements,
              recipes, and healthy snacking tips.
            </p>

            <form className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Your email address"
                required
                aria-label="Email for newsletter"
              />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;