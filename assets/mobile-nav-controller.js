// Central controller for mobile navigation
window.mobileNavController = {
  // Track if we've already initialized to prevent duplicate handlers
  initialized: false,

  // Initialize mobile navigation with proper event delegation
  init: function() {
    // Prevent multiple initializations
    if (this.initialized) return;
    this.initialized = true;

    // Remove any existing click listeners set by other scripts
    this.removeExistingListeners();

    // Get all necessary elements
    const mobileNav = document.getElementById('MobileNav');
    const mobileNavOverlay = document.getElementById('MobileNavOverlay');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNavClose = document.querySelector('.mobile-nav__close');
    const body = document.body;

    // Exit if critical elements are missing
    if (!mobileNav || !mobileNavToggle) {
      console.warn('Mobile nav elements not found');
      return;
    }

    // Create a properly namespaced toggle function
    this.toggleMobileNav = function(event) {
      // Prevent default for links/buttons
      if (event && event.preventDefault) {
        event.preventDefault();
      }

      // Debug log - for tracking when this is called
      console.log('mobileNavController.toggleMobileNav called');

      // Toggle classes for mobile nav, overlay, and body
      mobileNav.classList.toggle('is-active');
      if (mobileNavOverlay) {
        mobileNavOverlay.classList.toggle('is-active');
      }
      body.classList.toggle('overflow-hidden');

      // Update accessibility attributes
      const isOpen = mobileNav.classList.contains('is-active');
      mobileNav.setAttribute('aria-hidden', !isOpen);
      mobileNavToggle.setAttribute('aria-expanded', isOpen);
    };

    // Attach event listeners using the controller's method
    mobileNavToggle.addEventListener('click', this.toggleMobileNav);

    if (mobileNavClose) {
      mobileNavClose.addEventListener('click', this.toggleMobileNav);
    }

    if (mobileNavOverlay) {
      mobileNavOverlay.addEventListener('click', this.toggleMobileNav);
    }

    // Close when clicking on links
    const mobileNavLinks = mobileNav.querySelectorAll('.mobile-nav__link, .account-link, .currency-option');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', this.toggleMobileNav);
    });

    // Add escape key support
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && mobileNav.classList.contains('is-active')) {
        this.toggleMobileNav();
      }
    });

    console.log('Mobile nav controller initialized');
  },

  // Remove existing listeners to prevent conflicts
  removeExistingListeners: function() {
    // This is a placeholder - we can't easily remove anonymous listeners
    // But we can notify other scripts to not attach their listeners
    window.mobileNavAlreadyInitialized = true;
    console.log('Flagged mobile nav as already initialized');
  }
};

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  // Short delay to ensure we're the last to initialize
  setTimeout(function() {
    window.mobileNavController.init();
  }, 100);
});