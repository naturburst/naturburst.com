/**
 * Mobile Navigation Controller
 * A single unified script to handle mobile navigation with proper overlay and event handling
 */
document.addEventListener('DOMContentLoaded', function() {
  // Create a global namespace to avoid conflicts
  window.MobileNavController = window.MobileNavController || {};

  // Check if already initialized to prevent duplicate event handlers
  if (window.MobileNavController.initialized) return;

  // Core elements
  const mobileNav = document.getElementById('MobileNav');
  const mobileNavOverlay = document.getElementById('MobileNavOverlay');
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileNavClose = document.querySelector('.mobile-nav__close');
  const body = document.body;

  // Exit early if required elements don't exist
  if (!mobileNav || !mobileNavToggle) {
    console.warn('Mobile navigation elements not found - initialization aborted');
    return;
  }

  // Debug mode for troubleshooting (set to false in production)
  const debug = false;

  /**
   * Helper to log debug messages
   */
  function log(...args) {
    if (debug) console.log('[MobileNav]', ...args);
  }

  /**
   * Toggle the mobile navigation visibility
   * @param {Event} e - The event that triggered the toggle
   */
  function toggleMobileNav(e) {
    // Only prevent default for clickable elements
    if (e && e.preventDefault && (e.target.tagName === 'A' || e.target.tagName === 'BUTTON')) {
      e.preventDefault();
    }

    log('Toggling mobile nav');

    // Handle the menu state
    const isCurrentlyOpen = mobileNav.classList.contains('is-active');
    const willBeOpen = !isCurrentlyOpen;

    // Update visibility classes
    mobileNav.classList.toggle('is-active');
    if (mobileNavOverlay) {
      mobileNavOverlay.classList.toggle('is-active');
    }

    // Control body scrolling
    body.classList.toggle('overflow-hidden', willBeOpen);

    // Update accessibility attributes
    mobileNav.setAttribute('aria-hidden', !willBeOpen);
    if (mobileNavToggle) {
      mobileNavToggle.setAttribute('aria-expanded', willBeOpen);
    }

    // Log state change for debugging
    log('Menu is now', willBeOpen ? 'OPEN' : 'CLOSED');
  }

  /**
   * Close the mobile navigation
   */
  function closeMobileNav() {
    if (mobileNav.classList.contains('is-active')) {
      mobileNav.classList.remove('is-active');
      if (mobileNavOverlay) {
        mobileNavOverlay.classList.remove('is-active');
      }
      body.classList.remove('overflow-hidden');

      // Update accessibility attributes
      mobileNav.setAttribute('aria-hidden', 'true');
      if (mobileNavToggle) {
        mobileNavToggle.setAttribute('aria-expanded', 'false');
      }

      log('Menu closed');
    }
  }

  // Attach event listeners with proper binding and error handling
  function addEventSafely(element, eventType, handler) {
    if (!element) return;

    try {
      element.addEventListener(eventType, handler);
      log(`Added ${eventType} listener to`, element);
    } catch (error) {
      console.error(`Failed to add ${eventType} listener:`, error);
    }
  }

  // Toggle button handler
  addEventSafely(mobileNavToggle, 'click', function(e) {
    toggleMobileNav(e);
  });

  // Close button handler
  addEventSafely(mobileNavClose, 'click', function(e) {
    toggleMobileNav(e);
  });

  // Overlay click handler (separate element)
  addEventSafely(mobileNavOverlay, 'click', function(e) {
    if (e.target === mobileNavOverlay) {
      toggleMobileNav(e);
    }
  });

  // Escape key handler
  addEventSafely(document, 'keydown', function(e) {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-active')) {
      log('Escape key pressed, closing menu');
      toggleMobileNav(e);
    }
  });

  // Make sure all menu items are clickable by preventing event propagation
  const allInteractiveElements = mobileNav.querySelectorAll('a, button, .account-link, .currency-option');

  allInteractiveElements.forEach(element => {
    addEventSafely(element, 'click', function(e) {
      // Stop propagation to prevent the event from bubbling up and triggering other handlers
      e.stopPropagation();

      log('Interactive element clicked:', this.textContent.trim() || this.className);

      // Close the menu when links are clicked (optional, comment if not desired)
      if (this.getAttribute('href') && !this.getAttribute('href').startsWith('#')) {
        closeMobileNav();
      }

      // Allow the default action to continue
      return true;
    });
  });

  // Mark as initialized to prevent duplicate initialization
  window.MobileNavController.initialized = true;
  log('Mobile navigation initialization complete');

  // Apply force clickable styles to ensure all elements are interactive
  function applyForceClickableStyles() {
    // Check for an existing style element
    let styleEl = document.getElementById('mobile-nav-clickable-styles');

    // Create if it doesn't exist
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'mobile-nav-clickable-styles';
      document.head.appendChild(styleEl);
    }

    // Add CSS rules that ensure clickability
    styleEl.textContent = `
      #MobileNav,
      #MobileNav *,
      .mobile-nav-overlay {
        pointer-events: auto !important;
      }

      #MobileNav {
        z-index: 9999 !important;
      }

      #MobileNavOverlay {
        z-index: 9998 !important;
      }

      .mobile-nav.is-active {
        transform: translateX(0) !important;
        visibility: visible !important;
      }

      .mobile-nav-overlay.is-active {
        opacity: 1 !important;
        visibility: visible !important;
      }

      body.overflow-hidden {
        overflow: hidden !important;
      }
    `;

    log('Force clickable styles applied');
  }

  // Apply the styles immediately
  applyForceClickableStyles();
});