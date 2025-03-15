import React from 'react';
import Link from 'next/link';
import { FiInstagram, FiFacebook, FiTwitter, FiMail } from 'react-icons/fi';
import styles from '@/styles/components/Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          {/* Company Info */}
          <div className={styles.footerSection}>
            <div className={styles.logo}>
              <img src="/images/logo.svg" alt="NatureBurst Logo" />
            </div>
            <p className={styles.tagline}>Natural Fruit Bliss</p>
            <p className={styles.description}>
              Bringing the best of nature to your doorstep with our premium freeze-dried fruit products.
            </p>
            <div className={styles.socialIcons}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FiInstagram />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FiFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FiTwitter />
              </a>
              <a href="mailto:hello@natureburst.com" aria-label="Email">
                <FiMail />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.footerSection}>
            <h3>Quick Links</h3>
            <nav className={styles.footerNav}>
              <Link href="/">Home</Link>
              <Link href="/shop">Shop</Link>
              <Link href="/about">About Us</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>

          {/* Products */}
          <div className={styles.footerSection}>
            <h3>Our Products</h3>
            <nav className={styles.footerNav}>
              <Link href="/shop/tropi-mix">Tropi Mix</Link>
              <Link href="/shop/berry-burst">Berry Burst</Link>
              <Link href="/shop/citrus-delight">Citrus Delight</Link>
            </nav>
          </div>

          {/* Newsletter Signup */}
          <div className={styles.footerSection}>
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for exclusive offers and updates.</p>
            <form className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Your email address"
                required
                aria-label="Email for newsletter"
              />
              <button type="submit" aria-label="Subscribe">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className={styles.footerBottom}>
          <p>&copy; {currentYear} NatureBurst. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;