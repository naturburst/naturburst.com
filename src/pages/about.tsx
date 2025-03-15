import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import styles from '@/styles/components/About.module.css';

const About: React.FC = () => {
  // Animation variants for staggered element appearance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Timeline data for company history
  const timelineData = [
    {
      year: '2019',
      title: 'The Beginning',
      description: 'NatureBurst was founded with a simple mission: bring the natural goodness of fruits to people in a convenient, long-lasting format without sacrificing quality or nutrition.'
    },
    {
      year: '2020',
      title: 'First Product Line',
      description: 'We launched our first products under the Tropi Treats brand, focusing on tropical fruit varieties that were difficult to find fresh in many parts of the country.'
    },
    {
      year: '2021',
      title: 'Sustainability Focus',
      description: 'We implemented a comprehensive sustainability program, including compostable packaging and carbon-neutral shipping options.'
    },
    {
      year: '2022',
      title: 'Expanding Nationwide',
      description: 'Our products became available in retail stores across the country, making healthy, natural snacks accessible to more communities.'
    },
    {
      year: '2023',
      title: 'New Product Development',
      description: 'We expanded our R&D team to develop new innovative freeze-dried fruit products and explore additional preservation methods.'
    }
  ];

  return (
    <Layout
      title="About Us | NatureBurst"
      description="Learn about NatureBurst's story, mission, and our commitment to bringing you the best freeze-dried fruit products."
    >
      <div className={styles.aboutContainer}>
        {/* Hero Section */}
        <div className={styles.aboutHero}>
          <div className="container">
            <motion.div
              className={styles.heroContent}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1>Our Story</h1>
              <p>
                Bringing the best of nature to your everyday life, one delicious bite at a time.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Mission Section */}
        <section className={styles.missionSection}>
          <div className="container">
            <div className={styles.missionContent}>
              <motion.div
                className={styles.missionText}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2>Our Mission</h2>
                <p>
                  At NatureBurst, we believe that healthy snacking should be delicious,
                  convenient, and accessible to everyone. Our mission is to provide
                  high-quality, nutrient-rich, freeze-dried fruits that retain the
                  natural flavors and benefits of fresh fruits without any additives or preservatives.
                </p>
                <p>
                  We're committed to sustainable farming practices, working directly with
                  farmers who share our values of environmental stewardship and responsible
                  agriculture. By carefully selecting the finest fruits at peak ripeness
                  and using our proprietary freeze-drying process, we ensure that every
                  NatureBurst product delivers an exceptional taste experience while
                  preserving nature's goodness.
                </p>
              </motion.div>

              <motion.div
                className={styles.missionImage}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img src="/images/about/mission.jpg" alt="Fresh fruits being harvested" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className={styles.valuesSection}>
          <div className="container">
            <motion.h2
              className={styles.sectionTitle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Core Values
            </motion.h2>

            <motion.div
              className={styles.valuesGrid}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className={styles.valueCard} variants={itemVariants}>
                <div className={styles.valueIcon}>
                  <img src="/images/icons/natural.svg" alt="Natural" />
                </div>
                <h3>100% Natural</h3>
                <p>
                  We never use artificial flavors, colors, or preservatives.
                  Just pure fruit, nothing else.
                </p>
              </motion.div>

              <motion.div className={styles.valueCard} variants={itemVariants}>
                <div className={styles.valueIcon}>
                  <img src="/images/icons/quality.svg" alt="Quality" />
                </div>
                <h3>Quality First</h3>
                <p>
                  From fruit selection to packaging, we maintain the highest standards
                  at every step of our process.
                </p>
              </motion.div>

              <motion.div className={styles.valueCard} variants={itemVariants}>
                <div className={styles.valueIcon}>
                  <img src="/images/icons/sustainability.svg" alt="Sustainability" />
                </div>
                <h3>Sustainability</h3>
                <p>
                  We're committed to environmentally responsible practices
                  throughout our supply chain.
                </p>
              </motion.div>

              <motion.div className={styles.valueCard} variants={itemVariants}>
                <div className={styles.valueIcon}>
                  <img src="/images/icons/transparency.svg" alt="Transparency" />
                </div>
                <h3>Transparency</h3>
                <p>
                  We believe in open, honest communication about our products,
                  processes, and practices.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className={styles.teamSection}>
          <div className="container">
            <motion.h2
              className={styles.sectionTitle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Meet Our Team
            </motion.h2>

            <motion.div
              className={styles.teamGrid}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className={styles.teamMember} variants={itemVariants}>
                <div className={styles.memberPhoto}>
                  <img src="/images/team/founder.jpg" alt="Sarah Johnson" />
                </div>
                <h3>Sarah Johnson</h3>
                <p className={styles.memberRole}>Founder & CEO</p>
                <p className={styles.memberBio}>
                  With a background in nutritional science and a passion for healthy eating,
                  Sarah founded NatureBurst to make nutritious snacking more convenient and enjoyable.
                </p>
              </motion.div>

              <motion.div className={styles.teamMember} variants={itemVariants}>
                <div className={styles.memberPhoto}>
                  <img src="/images/team/production.jpg" alt="Michael Chen" />
                </div>
                <h3>Michael Chen</h3>
                <p className={styles.memberRole}>Head of Production</p>
                <p className={styles.memberBio}>
                  Michael brings 15 years of food technology experience, specializing in
                  freeze-drying techniques that preserve flavor and nutrients.
                </p>
              </motion.div>

              <motion.div className={styles.teamMember} variants={itemVariants}>
                <div className={styles.memberPhoto}>
                  <img src="/images/team/product.jpg" alt="Alexis Rivera" />
                </div>
                <h3>Alexis Rivera</h3>
                <p className={styles.memberRole}>Product Development</p>
                <p className={styles.memberBio}>
                  A culinary innovator with a focus on natural foods, Alexis leads our efforts
                  to create new flavor combinations and product lines.
                </p>
              </motion.div>

              <motion.div className={styles.teamMember} variants={itemVariants}>
                <div className={styles.memberPhoto}>
                  <img src="/images/team/sustainability.jpg" alt="James Washington" />
                </div>
                <h3>James Washington</h3>
                <p className={styles.memberRole}>Sustainability Director</p>
                <p className={styles.memberBio}>
                  James oversees our environmental initiatives, ensuring our practices
                  are as earth-friendly as our products are body-friendly.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* History Timeline Section */}
        <section className={styles.timelineSection}>
          <div className="container">
            <motion.h2
              className={styles.sectionTitle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Journey
            </motion.h2>

            <div className={styles.timeline}>
              {timelineData.map((item, index) => (
                <motion.div
                  key={index}
                  className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className={styles.timelineContent}>
                    <span className={styles.year}>{item.year}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className={styles.processSection}>
          <div className="container">
            <motion.h2
              className={styles.sectionTitle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Freeze-Drying Process
            </motion.h2>

            <motion.p
              className={styles.processSummary}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our proprietary freeze-drying process preserves the taste, texture, and nutrients
              of fresh fruits while extending shelf life without preservatives.
            </motion.p>

            <motion.div
              className={styles.processSteps}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className={styles.processStep} variants={itemVariants}>
                <div className={styles.stepNumber}>1</div>
                <h3>Selection</h3>
                <p>
                  We carefully select premium fruits at peak ripeness to ensure
                  optimal flavor and nutritional content.
                </p>
              </motion.div>

              <motion.div className={styles.processConnector} variants={itemVariants}></motion.div>

              <motion.div className={styles.processStep} variants={itemVariants}>
                <div className={styles.stepNumber}>2</div>
                <h3>Preparation</h3>
                <p>
                  Fruits are washed, sliced, and arranged on trays for optimal
                  freeze-drying results.
                </p>
              </motion.div>

              <motion.div className={styles.processConnector} variants={itemVariants}></motion.div>

              <motion.div className={styles.processStep} variants={itemVariants}>
                <div className={styles.stepNumber}>3</div>
                <h3>Freezing</h3>
                <p>
                  The prepared fruit is rapidly frozen to -40°F to preserve its
                  cellular structure.
                </p>
              </motion.div>

              <motion.div className={styles.processConnector} variants={itemVariants}></motion.div>

              <motion.div className={styles.processStep} variants={itemVariants}>
                <div className={styles.stepNumber}>4</div>
                <h3>Drying</h3>
                <p>
                  Under a vacuum, the frozen water goes directly from ice to vapor
                  (sublimation), leaving the fruit's structure intact.
                </p>
              </motion.div>

              <motion.div className={styles.processConnector} variants={itemVariants}></motion.div>

              <motion.div className={styles.processStep} variants={itemVariants}>
                <div className={styles.stepNumber}>5</div>
                <h3>Quality Control</h3>
                <p>
                  Every batch is inspected and tested to ensure it meets our
                  strict quality standards.
                </p>
              </motion.div>

              <motion.div className={styles.processConnector} variants={itemVariants}></motion.div>

              <motion.div className={styles.processStep} variants={itemVariants}>
                <div className={styles.stepNumber}>6</div>
                <h3>Packaging</h3>
                <p>
                  Products are carefully packaged in eco-friendly, resealable
                  pouches to maintain freshness.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className={styles.ctaSection}>
          <div className="container">
            <motion.div
              className={styles.ctaContent}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>Join Our Fruit Revolution</h2>
              <p>
                Experience the natural goodness of our freeze-dried fruits and
                discover why thousands have made NatureBurst a part of their healthy lifestyle.
              </p>
              <div className={styles.ctaButtons}>
                <a href="/shop" className="btn btn-primary">
                  Shop Now
                </a>
                <a href="/contact" className="btn btn-secondary">
                  Contact Us
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;