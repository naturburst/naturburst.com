// Enhanced mobile navigation controller
document.addEventListener('DOMContentLoaded', function() {
  // Get all required DOM elements with direct selectors
  const mobileNav = document.getElementById('MobileNav');
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileNavCloseButton = document.querySelector('.mobile-nav__close');
  const mobileNavOverlay = document.getElementById('MobileNavOverlay');
  const body = document.body;

  // Only initialize if the mobile nav exists
  if (!mobileNav) {
    console.warn('Mobile navigation element not found');
    return;
  }

  // Create overlay if it doesn't exist
  if (!mobileNavOverlay) {
    console.log('Creating mobile nav overlay');
    const overlay = document.createElement('div');
    overlay.id = 'MobileNavOverlay';
    overlay.className = 'mobile-nav-overlay';
    document.body.appendChild(overlay);
    mobileNavOverlay = overlay;
  }

  // Improved openMobileNav function with proper state management
  function openMobileNav() {
    console.log('Opening mobile navigation menu');

    // Apply direct style changes for better performance
    mobileNav.style.transform = 'translateX(0)';
    mobileNav.style.visibility = 'visible';
    mobileNav.classList.add('is-active');

    mobileNavOverlay.style.opacity = '1';
    mobileNavOverlay.style.visibility = 'visible';
    mobileNavOverlay.style.pointerEvents = 'auto';
    mobileNavOverlay.classList.add('is-active');

    // Prevent body scrolling
    body.style.overflow = 'hidden';
    body.classList.add('mobile-menu-open');

    // Set proper ARIA attributes
    mobileNav.setAttribute('aria-hidden', 'false');
    if (mobileNavToggle) {
      mobileNavToggle.setAttribute('aria-expanded', 'true');
    }
  }

  // Improved closeMobileNav function
  function closeMobileNav() {
    console.log('Closing mobile navigation menu');

    // Apply direct style changes with no delay
    mobileNav.style.transform = 'translateX(-100%)';
    mobileNav.style.visibility = 'hidden';
    mobileNav.classList.remove('is-active');

    mobileNavOverlay.style.opacity = '0';
    mobileNavOverlay.style.visibility = 'hidden';
    mobileNavOverlay.style.pointerEvents = 'none';
    mobileNavOverlay.classList.remove('is-active');

    // Restore body scrolling
    body.style.overflow = '';
    body.classList.remove('mobile-menu-open');

    // Update ARIA attributes
    mobileNav.setAttribute('aria-hidden', 'true');
    if (mobileNavToggle) {
      mobileNavToggle.setAttribute('aria-expanded', 'false');
    }
  }

  // Toggle button event listener
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      openMobileNav();
    });
  }

  // Close button event listener - IMPORTANT FIX
  if (mobileNavCloseButton) {
    mobileNavCloseButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeMobileNav();
    });
  } else {
    console.warn('Mobile nav close button not found');
  }

  // Overlay click event listener
  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeMobileNav();
    });
  }

  // Fix for handling all navigation links - IMPORTANT
  const allNavLinks = mobileNav.querySelectorAll('a, button:not(.mobile-nav__close)');
  allNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Allow default behavior for links but close menu
      if (!this.classList.contains('mobile-nav__close') &&
          !this.classList.contains('currency-option') &&
          !this.classList.contains('account-link')) {
        // Add slight delay for links to work before closing
        setTimeout(closeMobileNav, 50);
      }
    });
  });

  // Fix sign-in and register buttons
  const accountLinks = mobileNav.querySelectorAll('.account-link');
  accountLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Don't prevent default so the link works
      // Close menu immediately so no lingering buttons
      closeMobileNav();
    });
  });

  // ESC key support for accessibility
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-active')) {
      closeMobileNav();
    }
  });

  // Expose mobile nav controller to window
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

  console.log('Mobile navigation controller initialized with fixes');
});