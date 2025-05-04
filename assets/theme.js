/**
 * NatureBurst Theme JavaScript
 */

(function() {
  'use strict';

  // Theme Namespace
  window.theme = window.theme || {};

  /**
   * A11y Helpers
   */
  theme.a11y = {
    /**
     * Focus on element with trapFocus
     * @param {Element} container - Container DOM element to trap focus inside of
     */
    trapFocus(container) {
      const focusableElements = Array.from(
        container.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter(el => !el.hasAttribute('disabled'));

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (!firstFocusable) return;

      firstFocusable.focus();

      // Store reference to handler for removal
      this._keydownHandler = function(e) {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        }
      };

      // Attach event handler
      container.addEventListener('keydown', this._keydownHandler);
    },

    /**
     * Remove trap focus from current element
     */
    removeTrapFocus() {
      // Fixed: Now properly removes the event listener using stored reference
      if (this._keydownHandler) {
        document.removeEventListener('keydown', this._keydownHandler);
        this._keydownHandler = null;
      }
    }
  };

  /**
   * Cart functionality
   */
  theme.cart = {
    /**
     * Update the cart count display
     * @param {Number} count - New cart count
     */
    updateCartCount(count) {
      const cartCountElements = document.querySelectorAll('[data-cart-count]');
      if (!cartCountElements.length) return;

      cartCountElements.forEach(el => {
        el.textContent = count;
        // Toggle visibility of cart count
        const countContainer = el.closest('.cart-count');
        if (countContainer) {
          countContainer.style.display = count > 0 ? 'flex' : 'none';
        }
      });
    },

    /**
     * Add a product to cart via AJAX
     * @param {FormData} formData - Form data from the add to cart form
     * @param {Function} callback - Optional callback function
     */
    addItemFromForm(formData, callback) {
      fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: [
            {
              id: formData.get('id'),
              quantity: parseInt(formData.get('quantity'), 10) || 1,
              properties: this._getFormProperties(formData)
            }
          ]
        })
      })
      .then(response => response.json())
      .then(data => {
        // Update mini-cart and cart count
        this.getCartData().then(cart => {
          this.updateCartCount(cart.item_count);
          
          // Refresh cart section if it exists
          const cartSection = document.querySelector('[data-section-type="cart-items"]');
          if (cartSection && cartSection.dataset.sectionId) {
            this.refreshCartSection(cartSection.dataset.sectionId);
          }

          if (typeof callback === 'function') {
            callback(data);
          }

          // Fire added_to_cart event
          document.dispatchEvent(new CustomEvent('added_to_cart', {
            detail: {
              product: data,
              cart: cart
            }
          }));
        });
      })
      .catch(error => {
        console.error('Error adding item to cart:', error);
        if (typeof callback === 'function') {
          callback({ error: error.message });
        }
      });
    },

    /**
     * Refresh cart section
     * @param {String} sectionId - Section ID to refresh
     */
    refreshCartSection(sectionId) {
      fetch(`?section_id=${sectionId}`)
        .then(response => response.text())
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const newCartContent = doc.querySelector('.section-cart');
          const currentCart = document.querySelector('.section-cart');
          
          if (newCartContent && currentCart) {
            currentCart.innerHTML = newCartContent.innerHTML;
            // Re-initialize cart functionality
            if (typeof theme.cart.initializeCartFunctionality === 'function') {
              theme.cart.initializeCartFunctionality();
            }
          }
        })
        .catch(error => console.error('Error refreshing cart section:', error));
    },

    /**
     * Extract line item properties from form data
     * @param {FormData} formData - Form data object
     * @return {Object} Properties object
     */
    _getFormProperties(formData) {
      const properties = {};

      for (const [key, value] of formData.entries()) {
        if (key.includes('properties[')) {
          const propertyName = key.replace('properties[', '').replace(']', '');
          properties[propertyName] = value;
        }
      }

      return Object.keys(properties).length ? properties : null;
    },

    /**
     * Get current cart data
     * @return {Promise} Cart data promise
     */
    getCartData() {
      return fetch('/cart.js')
        .then(response => response.json())
        .catch(error => console.error('Error fetching cart:', error));
    },

    /**
     * Update cart promotions
     * @param {Object} cart - Cart data
     */
    updateCartPromotions(cart) {
      // Refresh cart promotions section
      if (window.Shopify && window.Shopify.section) {
        const cartSections = document.querySelectorAll('[data-section-type="cart-items"]');
        if (cartSections.length) {
          cartSections.forEach(section => {
            const sectionId = section.dataset.sectionId;
            if (sectionId) {
              window.Shopify.section.render(sectionId);
            }
          });
        }
      }
    }
  };

  /**
   * Mobile Navigation
   */
  theme.mobileNav = {
    /**
     * Initialize mobile navigation
     */
    init() {
      // Check if the dedicated controller is already handling mobile navigation
      if (window.MobileNavController && window.MobileNavController.initialized) {
        console.log('Mobile nav already initialized by controller - skipping theme.js initialization');
        return;
      }

      // If the controller isn't available, this acts as a fallback
      const mobileNav = document.getElementById('MobileNav');
      const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
      const mobileNavClose = document.querySelector('.mobile-nav__close');
      const body = document.body;

      if (!mobileNav || !mobileNavToggle) {
        console.error('Mobile nav elements not found. MobileNav:', !!mobileNav, 'Toggle:', !!mobileNavToggle);
        return;
      }

      // Ensure we have an overlay (critical for mobile navigation)
      let mobileNavOverlay = document.getElementById('MobileNavOverlay');
      if (!mobileNavOverlay) {
        mobileNavOverlay = document.createElement('div');
        mobileNavOverlay.id = 'MobileNavOverlay';
        mobileNavOverlay.className = 'mobile-nav-overlay';
        document.body.appendChild(mobileNavOverlay);

        // Add essential overlay styles if missing
        const style = document.createElement('style');
        style.textContent = `
          .mobile-nav-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
            pointer-events: none;
          }

          .mobile-nav-overlay.is-active {
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
          }
        `;
        document.head.appendChild(style);
      }

      // Enhanced toggle function with improved event handling
      const toggleMobileNav = (e) => {
        // Prevent default for anchor/button elements
        if (e && e.preventDefault) {
          e.preventDefault();
        }

        // Debug current state before toggling
        console.log('Toggling mobile nav. Current state:', mobileNav.classList.contains('is-active'));

        const isOpen = mobileNav.classList.contains('is-active');
        const willBeOpen = !isOpen;

        mobileNav.classList.toggle('is-active');
        mobileNavOverlay.classList.toggle('is-active');
        body.classList.toggle('overflow-hidden', willBeOpen);

        mobileNav.setAttribute('aria-hidden', !willBeOpen);
        mobileNavToggle.setAttribute('aria-expanded', willBeOpen);

        // Ensure proper accessibility with focus trapping
        if (willBeOpen) {
          theme.a11y.trapFocus(mobileNav);
          console.log('Mobile nav opened, focus trapped');
        } else {
          theme.a11y.removeTrapFocus();
          console.log('Mobile nav closed, focus trap removed');
        }
      };

      // Use explicit event handling with error detection
      mobileNavToggle.addEventListener('click', function(e) {
        console.log('Mobile nav toggle clicked in theme.js');
        toggleMobileNav(e);
      });

      if (mobileNavClose) {
        mobileNavClose.addEventListener('click', function(e) {
          console.log('Mobile nav close clicked in theme.js');
          toggleMobileNav(e);
        });
      }

      // Clicking the overlay closes the menu
      mobileNavOverlay.addEventListener('click', function(e) {
        console.log('Overlay clicked in theme.js');
        toggleMobileNav(e);
      });

      // Ensure links close the menu with proper event delegation
      const mobileNavLinks = mobileNav.querySelectorAll('a[href]:not([href="#"])');
      mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
          console.log('Mobile nav link clicked:', this.getAttribute('href'));
          toggleMobileNav();
        });
      });

      console.log('Mobile navigation initialized with enhanced handlers');

      // Add ESC key handler for accessibility
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('is-active')) {
          toggleMobileNav();
        }
      });

      // Expose the controller globally for other scripts to use
      window.MobileNavController = {
        initialized: true,
        toggle: toggleMobileNav
      };
    }
  };

  /**
   * Product Quantity Selector
   */
  theme.quantitySelector = {
    /**
     * Initialize quantity selectors
     */
    init() {
      document.querySelectorAll('.js-qty').forEach(container => {
        const input = container.querySelector('.js-qty__input');
        const increaseBtn = container.querySelector('.js-qty__inc');
        const decreaseBtn = container.querySelector('.js-qty__dec');

        if (!input || !increaseBtn || !decreaseBtn) return;

        increaseBtn.addEventListener('click', () => {
          const currentValue = parseInt(input.value, 10);
          const max = input.getAttribute('max') ? parseInt(input.getAttribute('max'), 10) : 9999;

          if (currentValue < max) {
            input.value = currentValue + 1;
            input.dispatchEvent(new Event('change', { bubbles: true }));
          }
        });

        decreaseBtn.addEventListener('click', () => {
          const currentValue = parseInt(input.value, 10);
          const min = input.getAttribute('min') ? parseInt(input.getAttribute('min'), 10) : 1;

          if (currentValue > min) {
            input.value = currentValue - 1;
            input.dispatchEvent(new Event('change', { bubbles: true }));
          }
        });

        // Prevent direct input of non-numbers
        input.addEventListener('keypress', e => {
          if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
          }
        });
      });
    }
  };

  /**
   * Product Image Slideshow
   */
  theme.productImages = {
    /**
     * Initialize product image galleries
     */
    init() {
      document.querySelectorAll('.product-images-slider').forEach(slider => {
        const mainImage = slider.querySelector('.product-featured-image');
        const thumbnails = slider.querySelectorAll('.product-single__thumbnail');

        if (!mainImage || !thumbnails.length) return;

        thumbnails.forEach(thumb => {
          thumb.addEventListener('click', e => {
            e.preventDefault();

            // Update active state
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');

            // Update main image
            const newSrc = thumb.getAttribute('data-src');
            const newSrcset = thumb.getAttribute('data-srcset');

            if (newSrc) mainImage.setAttribute('src', newSrc);
            if (newSrcset) mainImage.setAttribute('srcset', newSrcset);
          });
        });
      });
    }
  };

  /**
   * Initialize all theme functionality
   */
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize core theme modules
    theme.mobileNav.init();
    theme.quantitySelector.init();
    theme.productImages.init();

    // Update cart count on page load
    theme.cart.getCartData().then(cart => {
      theme.cart.updateCartCount(cart.item_count);
    });

    // Handle product forms
    document.querySelectorAll('form[action="/cart/add"]').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();

        const submitButton = form.querySelector('[type="submit"]');
        if (submitButton) {
          submitButton.classList.add('btn--loading');
          submitButton.disabled = true;
        }

        const formData = new FormData(form);

        theme.cart.addItemFromForm(formData, (response) => {
          if (submitButton) {
            submitButton.classList.remove('btn--loading');
            submitButton.disabled = false;
          }

          if (response.error) {
            // Show error message
            const errorContainer = form.querySelector('.product-form__error-message-wrapper');
            if (errorContainer) {
              const errorMessage = errorContainer.querySelector('.product-form__error-message');
              if (errorMessage) {
                errorMessage.textContent = response.error;
                errorContainer.classList.add('is-visible');

                setTimeout(() => {
                  errorContainer.classList.remove('is-visible');
                }, 5000);
              }
            }
          } else {
            // Show success message or open cart drawer
            document.dispatchEvent(new CustomEvent('product:added', {
              detail: {
                product: response
              }
            }));
          }
        });
      });
    });

    // Enhanced dropdown functionality for desktop navigation
    const dropdownItems = document.querySelectorAll('.site-nav__item--has-dropdown');
    let touchDevice = false;
    
    // Detect touch device
    window.addEventListener('touchstart', function onFirstTouch() {
      touchDevice = true;
      // Remove this listener as it's no longer needed
      window.removeEventListener('touchstart', onFirstTouch);
    }, false);
    
    // Add click handler for touch devices and mouse click dropdown toggling
    dropdownItems.forEach(item => {
      const link = item.querySelector('.site-nav__link--has-dropdown');
      const dropdown = item.querySelector('.site-nav__dropdown');
      
      if (!link || !dropdown) return;
      
      // For touch devices or click to open
      link.addEventListener('click', function(e) {
        // If we're on a desktop (not a touch device), hover will handle it
        // Only prevent default and handle on touch devices
        if (touchDevice || window.innerWidth < 990) {
          e.preventDefault();
          
          const isOpen = item.classList.contains('dropdown-active');
          
          // Close all dropdowns first
          dropdownItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('dropdown-active');
            }
          });
          
          // Toggle current dropdown
          item.classList.toggle('dropdown-active', !isOpen);
        }
      });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.site-nav__item--has-dropdown')) {
        dropdownItems.forEach(item => {
          item.classList.remove('dropdown-active');
        });
      }
    });
    
    // Allow clicking on dropdown links
    document.querySelectorAll('.site-nav__dropdown-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    });
  });
})();