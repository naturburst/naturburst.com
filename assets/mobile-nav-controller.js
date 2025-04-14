// Enhanced mobile navigation controller with improved reliability
document.addEventListener('DOMContentLoaded', function() {
  // Direct references to critical DOM elements
  const mobileNav = document.getElementById('MobileNav');
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileNavClose = document.querySelector('.mobile-nav__close');
  const mobileNavOverlay = document.getElementById('MobileNavOverlay');
  const body = document.body;

  // Exit if mobile nav doesn't exist (prevents console errors)
  if (!mobileNav) {
    console.warn('Mobile navigation element not found');
    return;
  }

  // Create overlay if it doesn't exist
  if (!mobileNavOverlay) {
    const overlay = document.createElement('div');
    overlay.id = 'MobileNavOverlay';
    overlay.className = 'mobile-nav-overlay';
    document.body.appendChild(overlay);
    mobileNavOverlay = overlay;
  }

  // Improved open function with direct DOM manipulation
  function openMobileNav() {
    console.log('Opening mobile navigation');

    // Apply styles directly for better performance
    mobileNav.style.transform = 'translateX(0)';
    mobileNav.style.visibility = 'visible';
    mobileNav.style.display = 'block'; // Ensure it's displayed
    mobileNav.classList.add('is-active');

    mobileNavOverlay.style.opacity = '1';
    mobileNavOverlay.style.visibility = 'visible';
    mobileNavOverlay.style.pointerEvents = 'auto';
    mobileNavOverlay.classList.add('is-active');

    // Prevent background scrolling
    body.style.overflow = 'hidden';
    body.classList.add('mobile-menu-open');

    // Set ARIA attributes
    mobileNav.setAttribute('aria-hidden', 'false');
    if (mobileNavToggle) {
      mobileNavToggle.setAttribute('aria-expanded', 'true');
    }

    // Ensure currency options are visible
    const currencyOptions = document.querySelectorAll('.currency-option');
    currencyOptions.forEach(option => {
      option.style.visibility = 'visible';
      option.style.display = 'block';
    });
  }

  // Improved close function with immediate actions
  function closeMobileNav() {
    console.log('Closing mobile navigation');

    // Apply styles directly
    mobileNav.style.transform = 'translateX(-100%)';
    mobileNav.style.visibility = 'hidden';

    // Add a small delay before removing the element from accessibility flow
    // This prevents flickering of content during transition
    setTimeout(() => {
      if (!mobileNav.classList.contains('is-active')) {
        mobileNav.style.display = 'none'; // Remove from layout completely
      }
    }, 300); // Match transition duration

    mobileNav.classList.remove('is-active');

    mobileNavOverlay.style.opacity = '0';
    mobileNavOverlay.style.visibility = 'hidden';
    mobileNavOverlay.style.pointerEvents = 'none';
    mobileNavOverlay.classList.remove('is-active');

    // Restore background scrolling
    body.style.overflow = '';
    body.classList.remove('mobile-menu-open');

    // Update ARIA attributes
    mobileNav.setAttribute('aria-hidden', 'true');
    if (mobileNavToggle) {
      mobileNavToggle.setAttribute('aria-expanded', 'false');
    }

    // Additional cleanup - make sure everything is properly hidden
    document.querySelectorAll('.mobile-nav .account-link, .mobile-nav .currency-option').forEach(el => {
      // Reset any inline styles that might be interfering
      el.style.removeProperty('z-index');
      el.style.removeProperty('position');
      el.style.removeProperty('visibility');
    });
  }

  // Toggle button event handler
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      openMobileNav();
    });
  }

  // Close button event handler with improved reliability
  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', function(e) {
      console.log('Close button clicked');
      e.preventDefault();
      e.stopPropagation();

      // Force immediate visibility changes on problematic elements
      const accountLinks = document.querySelectorAll('.account-link');
      const currencyOptions = document.querySelectorAll('.currency-option');

      accountLinks.forEach(link => {
        link.style.visibility = 'hidden';
      });

      currencyOptions.forEach(option => {
        option.style.visibility = 'hidden';
      });

      closeMobileNav();
    });
  }

  // Overlay click handler
  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeMobileNav();
    });
  }

  // Fix for currency selector initialization
  const currencySelectors = document.querySelectorAll('.currency-options .currency-option');
  if (currencySelectors.length > 0) {
    // Add specific styling to ensure visibility
    currencySelectors.forEach(option => {
      option.style.display = 'block';
      option.style.visibility = 'visible';
      option.style.opacity = '1';
    });

    // Ensure the active currency is highlighted
    const currentCurrency = Shopify?.currency?.active || 'INR';
    document.querySelector(`.currency-option[value="${currentCurrency}"]`)?.classList.add('active');
  }

  // Fix for navigation links closing menu
  const navLinks = document.querySelectorAll('[data-nav-link]');
  navLinks.forEach(link => {
    // For non-form links, let the navigation happen before closing
    link.addEventListener('click', function() {
      // Capture link destination
      const href = this.getAttribute('href');

      // FIX: Close the menu immediately to prevent lingering elements
      closeMobileNav();

      // For sign-in/register links, we don't need special handling
      // as they already work with the immediate close
    });
  });

  // Keyboard navigation support
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-active')) {
      closeMobileNav();
    }
  });

  // Make functions available globally
  window.MobileNavController = {
    initialized: true,
    open: openMobileNav,
    close: closeMobileNav,
    toggle: function() {
      if (mobileNav.classList.contains('is-active')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    }
  };
});