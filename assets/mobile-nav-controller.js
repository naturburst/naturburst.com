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
  }

  // Improved close function with immediate actions
  function closeMobileNav() {
    console.log('Closing mobile navigation');

    // Apply styles directly
    mobileNav.style.transform = 'translateX(-100%)';
    mobileNav.style.visibility = 'hidden';
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
  }

  // Toggle button event handler
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      openMobileNav();
    });
  }

  // Close button event handler - FIX: Added direct event listener
  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', function(e) {
      console.log('Close button clicked');
      e.preventDefault();
      e.stopPropagation();
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