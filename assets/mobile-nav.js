(function() {
  'use strict';

  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    initMobileNavigation();
  });

  /**
   * Initialize mobile navigation functionality
   */
  function initMobileNavigation() {
    const mobileNav = document.getElementById('MobileNav');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNavClose = document.querySelector('.mobile-nav__close');
    const body = document.body;

    // Exit if required elements don't exist
    if (!mobileNav || !mobileNavToggle) {
      console.warn('Mobile navigation elements not found');
      return;
    }

    /**
     * Toggle mobile navigation visibility
     */
    function toggleMobileNav(event) {
      if (event) {
        event.preventDefault();
      }

      // Toggle active class
      mobileNav.classList.toggle('is-active');

      // Prevent body scrolling when menu is open
      body.classList.toggle('overflow-hidden');

      // Update accessibility attributes
      const isOpen = mobileNav.classList.contains('is-active');
      mobileNav.setAttribute('aria-hidden', !isOpen);
      mobileNavToggle.setAttribute('aria-expanded', isOpen);

      console.log('Mobile nav visibility toggled:', isOpen);
    }

    // Attach event listeners
    mobileNavToggle.addEventListener('click', toggleMobileNav);

    if (mobileNavClose) {
      mobileNavClose.addEventListener('click', toggleMobileNav);
    }

    // Close mobile nav when clicking on links
    const mobileNavLinks = mobileNav.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', toggleMobileNav);
    });

    // Also close when clicking outside the menu
    document.addEventListener('click', function(event) {
      // If the menu is open and the click is outside the menu
      if (mobileNav.classList.contains('is-active') &&
          !mobileNav.contains(event.target) &&
          event.target !== mobileNavToggle) {
        toggleMobileNav();
      }
    });

    // Add escape key support
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && mobileNav.classList.contains('is-active')) {
        toggleMobileNav();
      }
    });
  }
})();