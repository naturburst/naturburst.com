import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { FaExpand, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const ProductImages: React.FC<{ images: string[] | undefined }> = ({
  images = [],
}) => {
  const [imageIndex, setImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Toggle fullscreen modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  // Handle keyboard navigation and escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsModalOpen(false)
    } else if (e.key === 'ArrowRight' && isModalOpen) {
      setImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowLeft' && isModalOpen) {
      setImageIndex((prev) => (prev > 0 ? prev - 1 : prev))
    }
  }, [isModalOpen, images.length])

  // Set up and clean up keyboard event listeners
  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown)
      // Prevent background scrolling when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [isModalOpen, handleKeyDown])

  // Navigate to previous image
  const prevImage = () => {
    setImageIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }

  // Navigate to next image
  const nextImage = () => {
    setImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : prev))
  }

  return (
    <Wrapper>
      <div className='main-img-container'>
        <img src={images[imageIndex]} alt='main product' className='main' />
        <button className='expand-btn' onClick={toggleModal}>
          <FaExpand />
        </button>
      </div>

      <div className='gallery'>
        {images.map((image, index) => {
          return (
            <img
              key={index}
              src={image}
              alt={`product thumbnail ${index + 1}`}
              onClick={() => setImageIndex(index)}
              className={index === imageIndex ? 'active' : undefined}
            />
          )
        })}
      </div>

      {/* Fullscreen image modal */}
      {isModalOpen && (
        <FullscreenModal>
          <div className='modal-content'>
            <button className='close-btn' onClick={toggleModal}>
              <FaTimes />
            </button>

            <div className='navigation-buttons'>
              <button
                className='nav-btn prev-btn'
                onClick={prevImage}
                disabled={imageIndex === 0}
              >
                <FaChevronLeft />
              </button>

              <button
                className='nav-btn next-btn'
                onClick={nextImage}
                disabled={imageIndex === images.length - 1}
              >
                <FaChevronRight />
              </button>
            </div>

            <div className='fullscreen-img-container'>
              <img src={images[imageIndex]} alt='fullscreen product view' />
            </div>

            <div className='modal-gallery'>
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`thumbnail ${index + 1}`}
                  onClick={() => setImageIndex(index)}
                  className={index === imageIndex ? 'active' : undefined}
                />
              ))}
            </div>
          </div>
        </FullscreenModal>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .main-img-container {
    width: 100%;
    height: auto;
    overflow: hidden;
    border-radius: var(--radius);
    margin-bottom: 1rem;
    position: relative;
  }

  .main {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    border-radius: var(--radius);
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  /* Expand button styling */
  .expand-btn {
    position: absolute;
    bottom: 15px;
    right: 15px;
    background: rgba(255, 255, 255, 0.7);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0.8;
    transition: all 0.2s;

    &:hover {
      opacity: 1;
      background: var(--clr-white);
      transform: scale(1.1);
    }

    svg {
      color: var(--clr-primary-5);
      font-size: 1.2rem;
    }
  }

  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;

    img {
      height: 90px; /* Increased from 75px */
      width: 100%;
      display: block;
      border-radius: var(--radius);
      object-fit: cover;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
        transform: scale(1.1);
      }
    }
  }

  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }

  @media (max-width: 576px) {
    .gallery {
      img {
        height: 60px; /* Increased from 50px */
      }
    }
  }

  @media (min-width: 768px) {
    .main {
      height: 500px; /* Increased from 400px */
      object-fit: contain;
    }

    .gallery {
      img {
        height: 90px; /* Increased from 75px */
      }
    }
  }

  @media (min-width: 992px) {
    .main {
      height: 550px; /* Increased from 450px */
    }

    .gallery {
      img {
        height: 100px; /* Increased from 80px */
      }
    }
  }
`

// Styled component for the fullscreen modal
const FullscreenModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .modal-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 3rem 1rem;
  }

  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    background: transparent;
    border: none;
    color: var(--clr-white);
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 1010;
    transition: all 0.2s;

    &:hover {
      color: var(--clr-primary-5);
      transform: scale(1.2);
    }
  }

  .navigation-buttons {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    pointer-events: none; /* Allows clicks to pass through to the image */
  }

  .nav-btn {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    pointer-events: auto; /* Make buttons clickable */
    transition: all 0.2s;
    color: var(--clr-white);

    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.4);
      transform: scale(1.1);
    }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }

  .fullscreen-img-container {
    height: 80%; /* Increased from 75% */
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-height: 100%;
      max-width: 100%;
      object-fit: contain;
    }
  }

  .modal-gallery {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    max-width: 100%;
    overflow-x: auto;
    padding: 10px 0;

    &::-webkit-scrollbar {
      height: 8px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 10px;
    }

    img {
      height: 80px; /* Increased from 70px */
      border-radius: var(--radius);
      cursor: pointer;
      opacity: 0.6;
      transition: all 0.2s;

      &:hover {
        opacity: 0.9;
      }

      &.active {
        opacity: 1;
        box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
      }
    }
  }

  @media (max-width: 768px) {
    .nav-btn {
      width: 40px;
      height: 40px;
    }

    .fullscreen-img-container {
      height: 65%; /* Increased from 60% */
    }

    .modal-gallery img {
      height: 60px; /* Increased from 50px */
    }
  }
`

export default ProductImages