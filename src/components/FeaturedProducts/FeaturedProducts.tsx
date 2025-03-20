import React, { useRef } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Product from '../Product'
import { useProductsContext } from '../../context/products_context'
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const FeaturedProducts = () => {
  const { featuredProducts } = useProductsContext()
  // Fix: Properly type the ref as HTMLDivElement
  const sliderRef = useRef<HTMLDivElement>(null);

  // Calculate the width of a single product slide (including margin)
  const scrollOneProduct = () => {
    if (sliderRef.current) {
      const slides = sliderRef.current.querySelectorAll('.product-slide');
      if (slides.length > 0) {
        // Get the first slide's width including margin
        const slideWidth = slides[0].getBoundingClientRect().width;
        const computedStyle = window.getComputedStyle(slides[0]);
        const marginRight = parseFloat(computedStyle.marginRight);

        // Return total width (slide + margin)
        return slideWidth + marginRight;
      }
    }
    // Fallback to default width if calculation fails
    return 280 + 24; // 280px slide width + 1.5rem (24px) margin
  };

  const scrollLeft = () => {
    // For desktop with grid layout, we don't need to scroll
    if (window.innerWidth >= 768) {
      return;
    }

    if (sliderRef.current && orderedProducts.length > 0) {
      const slider = sliderRef.current;
      const itemWidth = scrollOneProduct();

      // Calculate current visible product index
      const currentIndex = Math.round(slider.scrollLeft / itemWidth);

      // If at the beginning, jump to the end
      if (currentIndex === 0) {
        // Disable smooth scrolling temporarily to avoid seeing the jump
        slider.style.scrollBehavior = 'auto';
        // Jump to the last product
        slider.scrollLeft = itemWidth * (orderedProducts.length - 1);

        // Force browser to apply the scroll change before continuing
        void slider.offsetWidth;

        // Re-enable smooth scrolling for visual feedback
        slider.style.scrollBehavior = 'smooth';
      } else {
        // Normal scroll to previous product
        slider.scrollTo({ left: itemWidth * (currentIndex - 1), behavior: 'smooth' });
      }
    }
  };

  const scrollRight = () => {
    // For desktop with grid layout, we don't need to scroll
    if (window.innerWidth >= 768) {
      return;
    }

    if (sliderRef.current && orderedProducts.length > 0) {
      const slider = sliderRef.current;
      const itemWidth = scrollOneProduct();

      // Calculate current visible product index
      const currentIndex = Math.round(slider.scrollLeft / itemWidth);

      // If at the end, jump to the beginning
      if (currentIndex >= orderedProducts.length - 1) {
        // Disable smooth scrolling temporarily to avoid seeing the jump
        slider.style.scrollBehavior = 'auto';
        // Jump to the first product
        slider.scrollLeft = 0;

        // Force browser to apply the scroll change before continuing
        void slider.offsetWidth;

        // Re-enable smooth scrolling for visual feedback
        slider.style.scrollBehavior = 'smooth';
      } else {
        // Normal scroll to next product
        slider.scrollTo({ left: itemWidth * (currentIndex + 1), behavior: 'smooth' });
      }
    }
  };

  // Ensure products are displayed in a consistent order
  const orderedProducts = React.useMemo(() => {
    // Return products in their original order from the context
    return [...(featuredProducts || [])].sort((a, b) => {
      // Use string comparison for IDs that might be strings
      // This will work for both string and numeric IDs
      return String(a.id).localeCompare(String(b.id));
    });
  }, [featuredProducts]);

  return (
    <Wrapper>
      <div className='section-header'>
        <h2>EXPLORE OUR PRODUCTS</h2>
      </div>

      <div className="slider-container">
        <button className="nav-btn prev-btn" onClick={scrollLeft}>
          <FaChevronLeft />
        </button>

        <div className='products-slider' ref={sliderRef} style={{ scrollBehavior: 'smooth' }}>
          {orderedProducts.length > 0 &&
            orderedProducts.map(product => (
              <div className="product-slide" key={product.id}>
                <Product product={product} />
              </div>
            ))}
        </div>

        <button className="nav-btn next-btn" onClick={scrollRight}>
          <FaChevronRight />
        </button>
      </div>

      <div className="view-all-container">
        <Link to='/products' className='view-all-btn'>
          VIEW ALL PRODUCTS <FaArrowRight className="arrow-icon" />
        </Link>
      </div>
    </Wrapper>
  )
}

export default FeaturedProducts

const Wrapper = styled.section`
  padding: 3rem 0;
  background: white;
  width: 100%;
  max-width: 100%;

  .section-header {
    text-align: center;
    margin-bottom: 2rem;
    padding: 0 1rem;

    h2 {
      font-size: 1.3rem;
      color: #1a2e37;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    h3 {
      font-size: 2rem;
      color: #1a2e37;
      font-weight: 700;
      margin: 0;
    }
  }

  .slider-container {
    position: relative;
    width: 100%;
    margin: 0 auto;
    padding: 0;
    display: flex;
    align-items: center;
  }

  .products-slider {
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    padding: 1rem 0;
    width: 100%;

    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }
  }

  .product-slide {
    flex: 0 0 auto;
    width: 280px;
    margin-right: 1.5rem;
  }

  .nav-btn {
    display: none;
    background: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: absolute;
    z-index: 2;
    transition: all 0.3s ease;

    &:hover {
      background: var(--clr-primary-5);
      color: white;
    }

    svg {
      font-size: 1rem;
    }
  }

  .prev-btn {
    left: 10px;
  }

  .next-btn {
    right: 10px;
  }

  .view-all-container {
    text-align: center;
    margin-top: 2rem;
  }

  .view-all-btn {
    display: inline-flex;
    align-items: center;
    background: var(--clr-primary-5);
    color: white;
    font-weight: 600;
    padding: 0.8rem 1.5rem;
    border-radius: 5px;
    transition: all 0.3s ease;

    .arrow-icon {
      margin-left: 0.5rem;
      transition: transform 0.3s ease;
    }

    &:hover {
      background: var(--clr-primary-3);

      .arrow-icon {
        transform: translateX(3px);
      }
    }
  }

  @media (min-width: 768px) {
    .slider-container {
      padding: 0 50px;
      max-width: 100%;
    }

    .products-slider {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      justify-content: space-between;
      padding: 1rem 0;
      overflow-x: visible;
    }

    .nav-btn {
      display: flex;
    }

    .product-slide {
      width: 100%;
      margin-right: 0;
    }
  }

  @media (min-width: 1200px) {
    .slider-container {
      padding: 0 60px;
    }

    .products-slider {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
  }

  @media (max-width: 767px) {
    .slider-container {
      padding: 0;
    }

    .products-slider {
      padding: 1rem 1rem;
      justify-content: flex-start;
    }

    .product-slide {
      width: 85vw;
    }
  }
`