import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import {
  BlogPost,
  getBlogPostBySlug,
  getAllBlogSlugs,
  formatDate,
  blogPosts
} from '@/data/blog';
import { FiCalendar, FiClock, FiTag, FiArrowLeft, FiShare2 } from 'react-icons/fi';
import styles from '@/styles/BlogDetail.module.css';

interface BlogDetailProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post, relatedPosts }) => {
  const router = useRouter();

  // Handle fallback state during static generation
  if (router.isFallback) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <Layout
      title={`${post.title} | NatureBurst Blog`}
      description={post.excerpt}
    >
      <div className={styles.blogDetailContainer}>
        {/* Hero section with image */}
        <div className={styles.blogHero} style={{ backgroundImage: `url(${post.imageUrl})` }}>
          <div className={styles.heroOverlay}></div>
          <div className="container">
            <motion.div
              className={styles.heroContent}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className={styles.category}>{post.category}</span>
              <h1>{post.title}</h1>

              <div className={styles.postMeta}>
                <div className={styles.authorInfo}>
                  <div className={styles.authorAvatar}>
                    <img src={post.author.avatarUrl} alt={post.author.name} />
                  </div>
                  <div>
                    <div className={styles.authorName}>{post.author.name}</div>
                    <div className={styles.authorRole}>{post.author.role}</div>
                  </div>
                </div>

                <div className={styles.postInfo}>
                  <span className={styles.metaItem}>
                    <FiCalendar size={14} />
                    {formatDate(post.publishDate)}
                  </span>
                  <span className={styles.metaItem}>
                    <FiClock size={14} />
                    {post.readTime} min read
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="container">
          <div className={styles.blogContent}>
            <motion.div
              className={styles.mainContent}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Back to blog link */}
              <a href="/blog" className={styles.backLink}>
                <FiArrowLeft size={14} />
                Back to Blog
              </a>

              {/* Article content */}
              <article className={styles.article}>
                {/* Using dangerouslySetInnerHTML to render HTML content from the blog post
                    In a real app, consider using a Markdown or rich text renderer */}
                <div
                  className={styles.postContent}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </article>

              {/* Tags */}
              <div className={styles.postTags}>
                <span className={styles.tagsLabel}>
                  <FiTag size={14} />
                  Tags:
                </span>
                {post.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Share links */}
              <div className={styles.sharePost}>
                <span className={styles.shareLabel}>
                  <FiShare2 size={14} />
                  Share this post:
                </span>
                <div className={styles.socialLinks}>
                  <a href="#" aria-label="Share on Facebook">F</a>
                  <a href="#" aria-label="Share on Twitter">T</a>
                  <a href="#" aria-label="Share on LinkedIn">L</a>
                  <a href="#" aria-label="Share on Pinterest">P</a>
                </div>
              </div>

              {/* Author bio */}
              <div className={styles.authorBio}>
                <div className={styles.authorAvatar}>
                  <img src={post.author.avatarUrl} alt={post.author.name} />
                </div>
                <div className={styles.authorInfo}>
                  <h3>{post.author.name}</h3>
                  <p className={styles.authorRole}>{post.author.role}</p>
                  <p className={styles.bioText}>
                    {post.author.name} is a passionate advocate for natural, healthy foods and
                    sustainable practices. With extensive experience in the food industry, they
                    bring valuable insights to the NatureBurst community.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              {/* Related posts section */}
              <div className={styles.sidebarSection}>
                <h2>Related Posts</h2>
                <div className={styles.relatedPosts}>
                  {relatedPosts.map((relatedPost) => (
                    <a
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className={styles.relatedPost}
                    >
                      <div className={styles.relatedPostImage}>
                        <img src={relatedPost.imageUrl} alt={relatedPost.title} />
                      </div>
                      <div className={styles.relatedPostInfo}>
                        <h3>{relatedPost.title}</h3>
                        <span className={styles.relatedPostDate}>
                          {formatDate(relatedPost.publishDate)}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Newsletter signup */}
              <div className={styles.newsletterSignup}>
                <h2>Enjoy this article?</h2>
                <p>Subscribe to our newsletter for more nutrition tips, recipes, and product updates.</p>
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

              {/* Popular tags */}
              <div className={styles.sidebarSection}>
                <h2>Popular Tags</h2>
                <div className={styles.popularTags}>
                  {/* Get unique tags across all posts and display top ones */}
                  {Array.from(new Set(blogPosts.flatMap(p => p.tags))).slice(0, 8).map((tag, index) => (
                    <span key={index} className={styles.popularTag}>{tag}</span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllBlogSlugs();

  const paths = slugs.map((slug) => ({
    params: { slug }
  }));

  return {
    paths,
    fallback: false // Set to true if you want to generate pages at runtime
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      notFound: true
    };
  }

  // Find related posts based on category and tags
  // Using a simple algorithm to find posts with matching category or tags
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id) // Exclude current post
    .map(p => {
      // Calculate relevance score based on category and tag matches
      let score = 0;
      if (p.category === post.category) score += 3;

      // Count matching tags
      const matchingTags = p.tags.filter(tag => post.tags.includes(tag)).length;
      score += matchingTags;

      return { ...p, relevanceScore: score };
    })
    .filter(p => p.relevanceScore > 0) // Only posts with some relevance
    .sort((a, b) => b.relevanceScore - a.relevanceScore) // Sort by relevance
    .slice(0, 3); // Take top 3

  return {
    props: {
      post,
      relatedPosts
    },
    revalidate: 3600 // Revalidate every hour
  };
};

export default BlogDetail;