import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { FiMapPin, FiMail, FiPhone, FiClock } from 'react-icons/fi';
import styles from '@/styles/Contact.module.css';

const Contact: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate form submission
    setFormStatus('submitting');

    try {
      // This would be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormStatus('success');

      // Reset form after success
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Reset status after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    } catch (error) {
      setFormStatus('error');

      // Reset error status after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }
  };

  // Animation variants
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
      transition: { duration: 0.5 }
    }
  };

  return (
    <Layout
      title="Contact Us | NatureBurst"
      description="Have a question or feedback? Reach out to the NatureBurst team. We'd love to hear from you!"
    >
      <div className={styles.contactContainer}>
        <div className={styles.contactHeader}>
          <div className="container">
            <h1 className={styles.pageTitle}>Contact Us</h1>
            <p className={styles.pageDescription}>
              Have questions about our products? Want to partner with us?
              Or just want to say hello? We'd love to hear from you!
            </p>
          </div>
        </div>

        <div className="container">
          <div className={styles.contactContent}>
            <motion.div
              className={styles.contactInfo}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className={styles.infoCard} variants={itemVariants}>
                <div className={styles.infoIcon}>
                  <FiMapPin />
                </div>
                <h3>Address</h3>
                <p>123 Nature Way</p>
                <p>Fruit Valley, CA 92345</p>
                <p>United States</p>
              </motion.div>

              <motion.div className={styles.infoCard} variants={itemVariants}>
                <div className={styles.infoIcon}>
                  <FiMail />
                </div>
                <h3>Email</h3>
                <p>info@natureburst.com</p>
                <p>support@natureburst.com</p>
                <p>orders@natureburst.com</p>
              </motion.div>

              <motion.div className={styles.infoCard} variants={itemVariants}>
                <div className={styles.infoIcon}>
                  <FiPhone />
                </div>
                <h3>Phone</h3>
                <p>Main: (555) 123-4567</p>
                <p>Support: (555) 987-6543</p>
                <p>Toll-free: 1-800-NATURE</p>
              </motion.div>

              <motion.div className={styles.infoCard} variants={itemVariants}>
                <div className={styles.infoIcon}>
                  <FiClock />
                </div>
                <h3>Hours</h3>
                <p>Monday - Friday: 9am - 5pm</p>
                <p>Saturday: 10am - 2pm</p>
                <p>Sunday: Closed</p>
              </motion.div>
            </motion.div>

            <div className={styles.contactFormSection}>
              <motion.div
                className={styles.formHeader}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2>Send Us a Message</h2>
                <p>
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </motion.div>

              <motion.form
                className={styles.contactForm}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className={styles.formGroup}>
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="product">Product Inquiry</option>
                    <option value="order">Order Status</option>
                    <option value="return">Returns & Exchanges</option>
                    <option value="wholesale">Wholesale Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="How can we help you?"
                    rows={5}
                  />
                </div>

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={formStatus === 'submitting'}
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>

                {formStatus === 'success' && (
                  <div className={styles.successMessage}>
                    Thank you for your message! We'll get back to you soon.
                  </div>
                )}

                {formStatus === 'error' && (
                  <div className={styles.errorMessage}>
                    There was an error sending your message. Please try again.
                  </div>
                )}
              </motion.form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className={styles.mapSection}>
          <motion.div
            className={styles.map}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* This would be replaced with actual Google Maps or other map integration */}
            <div className={styles.mapPlaceholder}>
              <div className={styles.mapPin}>
                <FiMapPin size={36} />
              </div>
              <p>NatureBurst HQ</p>
              <span>Interactive map loading...</span>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="container">
          <div className={styles.faqSection}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Frequently Asked Questions
            </motion.h2>

            <motion.div
              className={styles.faqGrid}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className={styles.faqItem} variants={itemVariants}>
                <h3>How long do your products stay fresh?</h3>
                <p>
                  Our freeze-dried fruits have a shelf life of up to 2 years when stored in a cool,
                  dry place and kept in their original sealed packaging. Once opened, we recommend
                  consuming within 2 weeks for optimal freshness.
                </p>
              </motion.div>

              <motion.div className={styles.faqItem} variants={itemVariants}>
                <h3>Are your products suitable for vegans?</h3>
                <p>
                  Yes, all of our products are 100% plant-based and vegan-friendly.
                  They contain no animal products or by-products whatsoever.
                </p>
              </motion.div>

              <motion.div className={styles.faqItem} variants={itemVariants}>
                <h3>Do you ship internationally?</h3>
                <p>
                  Currently, we ship throughout the United States and Canada.
                  We're working on expanding our shipping capabilities to other countries soon!
                </p>
              </motion.div>

              <motion.div className={styles.faqItem} variants={itemVariants}>
                <h3>What is your return policy?</h3>
                <p>
                  We want you to be completely satisfied with your purchase. If you're not happy
                  with your order for any reason, please contact us within 14 days of receiving
                  your products, and we'll be happy to assist with a return or exchange.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;