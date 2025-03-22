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
      });
    },

    /**
     * Add a product to cart via AJAX
     * @param {Number} id - Product variant ID
     * @param {Number} quantity - Quantity to add
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
              properties: theme.cart._getFormProperties(formData)
            }
          ]
        })
      })
      .then(response => response.json())
      .then(data => {
        // Update mini-cart and cart count
        this.getCartData().then(cart => {
          this.updateCartCount(cart.item_count);

          if (typeof callback === 'function') {
            callback(data);
          }

          // Fire added_to_cart event
          document.dispatchEvent(new CustomEvent('added_to_cart', {
            detail: {
              product: data
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
    }
  };

  /**
   * Mobile Navigation
   * MODIFIED: Check for mobile-nav-controller.js before initializing
   */
  theme.mobileNav = {
    /**
     * Initialize mobile navigation
     */
    init() {
      // Check if the new controller is already handling mobile navigation
      if (window.MobileNavController && window.MobileNavController.initialized) {
        console.log('Mobile nav already initialized by controller - skipping theme.js initialization');
        return;
      }

      const mobileNav = document.getElementById('MobileNav');
      const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
      const mobileNavClose = document.querySelector('.mobile-nav__close');
      const body = document.body;

      if (!mobileNav || !mobileNavToggle) {
        console.error('Mobile nav elements not found. MobileNav:', !!mobileNav, 'Toggle:', !!mobileNavToggle);
        return;
      }

      // Enhanced toggle function with improved event handling
      const toggleMobileNav = (e) => {
        // Prevent default for anchor/button elements
        if (e && e.preventDefault) {
          e.preventDefault();
        }

        // Debug current state before toggling
        console.log('Toggling mobile nav. Current state:', mobileNav.classList.contains('is-active'));

        mobileNav.classList.toggle('is-active');
        body.classList.toggle('overflow-hidden');

        const isOpen = mobileNav.classList.contains('is-active');
        mobileNav.setAttribute('aria-hidden', !isOpen);
        mobileNavToggle.setAttribute('aria-expanded', isOpen);

        // Ensure proper accessibility with focus trapping
        if (isOpen) {
          theme.a11y.trapFocus(mobileNav);
          console.log('Mobile nav opened, focus trapped');
        } else {
          theme.a11y.removeTrapFocus();
          console.log('Mobile nav closed, focus trap removed');
        }
      };

      // Use explicit event handling with error detection
      mobileNavToggle.addEventListener('click', function(e) {
        console.log('Mobile nav toggle clicked');
        toggleMobileNav(e);
      });

      if (mobileNavClose) {
        mobileNavClose.addEventListener('click', function(e) {
          console.log('Mobile nav close clicked');
          toggleMobileNav(e);
        });
      }

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
  });
})();