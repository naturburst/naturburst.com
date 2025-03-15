import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { blogPosts, formatDate } from '@/data/blog';
import { FiCalendar, FiClock, FiTag } from 'react-icons/fi';
import styles from '@/styles/Blog.module.css';

const Blog: React.FC = () => {
  // State for category filter
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  // Get unique categories
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  // Filter posts by category
  const filteredPosts = categoryFilter
    ? blogPosts.filter(post => post.category === categoryFilter)
    : blogPosts;

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
    <Layout
      title="Blog | NatureBurst"
      description="Explore articles, recipes, and tips about freeze-dried fruits, healthy snacking, and sustainable food practices."
    >
      <div className={styles.blogContainer}>
        <div className={styles.blogHeader}>
          <div className="container">
            <h1 className={styles.pageTitle}>NatureBurst Blog</h1>
            <p className={styles.pageDescription}>
              Insights, recipes, and stories about natural foods, healthy snacking, and sustainable living
            </p>
          </div>
        </div>

        <div className="container">
          <div className={styles.blogContent}>
            {/* Sidebar */}
            <div className={styles.blogSidebar}>
              {/* Category filter */}
              <div className={styles.sidebarSection}>
                <h2>Categories</h2>
                <ul className={styles.categoryList}>
                  <li>
                    <button
                      className={`${styles.categoryButton} ${categoryFilter === null ? styles.active : ''}`}
                      onClick={() => setCategoryFilter(null)}
                    >
                      All Categories
                    </button>
                  </li>
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        className={`${styles.categoryButton} ${categoryFilter === category ? styles.active : ''}`}
                        onClick={() => setCategoryFilter(category)}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent posts */}
              <div className={styles.sidebarSection}>
                <h2>Recent Posts</h2>
                <ul className={styles.recentPostList}>
                  {blogPosts.slice(0, 3).map((post) => (
                    <li key={post.id}>
                      <a href={`/blog/${post.slug}`} className={styles.recentPost}>
                        <div className={styles.recentPostImage}>
                          <img src={post.imageUrl} alt={post.title} />
                        </div>
                        <div className={styles.recentPostInfo}>
                          <h3>{post.title}</h3>
                          <span className={styles.recentPostDate}>
                            {formatDate(post.publishDate)}
                          </span>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter signup */}
              <div className={`${styles.sidebarSection} ${styles.newsletterSection}`}>
                <h2>Stay Updated</h2>
                <p>Subscribe to our newsletter for the latest articles, recipes, and offers.</p>
                <form className={styles.newsletterForm}>
                  <input
                    type="email"
                    placeholder="Your email address"
                    required
                    aria-label="Email for newsletter"
                  />
                  <button type="submit">Subscribe</button>
                </form>
              </div>
            </div>

            {/* Main content - Blog posts */}
            <div className={styles.blogPosts}>
              <motion.div
                className={styles.postsGrid}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredPosts.map((post) => (
                  <motion.article
                    key={post.id}
                    className={styles.blogCard}
                    variants={itemVariants}
                  >
                    <a href={`/blog/${post.slug}`} className={styles.blogCardLink}>
                      <div className={styles.blogCardImage}>
                        <img src={post.imageUrl} alt={post.title} />
                        <span className={styles.blogCategory}>{post.category}</span>
                      </div>

                      <div className={styles.blogCardContent}>
                        <h2 className={styles.blogCardTitle}>{post.title}</h2>

                        <div className={styles.blogCardMeta}>
                          <span className={styles.metaItem}>
                            <FiCalendar size={14} />
                            {formatDate(post.publishDate)}
                          </span>
                          <span className={styles.metaItem}>
                            <FiClock size={14} />
                            {post.readTime} min read
                          </span>
                        </div>

                        <p className={styles.blogCardExcerpt}>{post.excerpt}</p>

                        <div className={styles.blogCardTags}>
                          <FiTag size={14} />
                          {post.tags.map((tag, index) => (
                            <span key={index} className={styles.tag}>
                              {tag}
                              {index < post.tags.length - 1 && ', '}
                            </span>
                          ))}
                        </div>
                      </div>
                    </a>
                  </motion.article>
                ))}
              </motion.div>

              {/* Pagination placeholder for future expansion */}
              <div className={styles.pagination}>
                <button className={`${styles.pageButton} ${styles.active}`}>1</button>
                <button className={styles.pageButton}>2</button>
                <button className={styles.pageButton}>3</button>
                <button className={styles.pageButton}>
                  Next &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;