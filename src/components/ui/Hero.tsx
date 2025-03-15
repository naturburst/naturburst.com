import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from '@/styles/components/Hero.module.css';

const Hero: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroOverlay}></div>
      <div className={styles.heroContent}>
        <motion.div
          className={styles.heroText}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants}>
            Experience <span>Natural Fruit Bliss</span>
          </motion.h1>
          <motion.p variants={itemVariants}>
            Premium freeze-dried fruits with all natural flavors and nutrients preserved.
            No additives, just pure fruit goodness in every bite.
          </motion.p>
          <motion.div className={styles.heroCta} variants={itemVariants}>
            <Link href="/shop" className="btn btn-primary">
              Shop Now
            </Link>
            <Link href="/about" className="btn btn-secondary">
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;