// Enhanced mobile-nav-controller.js with improved event handling
document.addEventListener('DOMContentLoaded', function() {
  // Direct references to needed elements with more precise selectors
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileNav = document.getElementById('MobileNav');
  const mobileNavClose = document.querySelector('.mobile-nav__close');
  const mobileNavOverlay = document.getElementById('MobileNavOverlay');
  const body = document.body;

  // Exit if elements don't exist
  if (!mobileNavToggle || !mobileNav) {
    console.error('Required mobile nav elements not found');
    return;
  }

  // Create overlay if it doesn't exist
  if (!mobileNavOverlay) {
    const overlay = document.createElement('div');
    overlay.id = 'MobileNavOverlay';
    overlay.className = 'mobile-nav-overlay';
    document.body.appendChild(overlay);
  }

  // Improved open function with direct manipulation
  function openMobileNav() {
    console.log('Opening mobile nav');
    mobileNav.style.transform = 'translateX(0)';
    mobileNav.style.visibility = 'visible';
    mobileNav.classList.add('is-active');
    mobileNavOverlay.style.opacity = '1';
    mobileNavOverlay.style.visibility = 'visible';
    mobileNavOverlay.style.pointerEvents = 'auto';
    mobileNavOverlay.classList.add('is-active');
    body.style.overflow = 'hidden';
    body.classList.add('mobile-menu-open');
  }

  // Improved close function with direct manipulation
  function closeMobileNav() {
    console.log('Closing mobile nav');
    mobileNav.style.transform = 'translateX(-100%)';
    mobileNav.style.visibility = 'hidden';
    mobileNav.classList.remove('is-active');
    mobileNavOverlay.style.opacity = '0';
    mobileNavOverlay.style.visibility = 'hidden';
    mobileNavOverlay.style.pointerEvents = 'none';
    mobileNavOverlay.classList.remove('is-active');
    body.style.overflow = '';
    body.classList.remove('mobile-menu-open');
  }

  // Add toggle button event listener
  mobileNavToggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Toggle button clicked');
    openMobileNav();
  });

  // Add close button event listener - FIXED
  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Close button clicked');
      closeMobileNav();
    });
  }

  // Add overlay event listener
  mobileNavOverlay.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Overlay clicked');
    closeMobileNav();
  });

  // Make sure all links in the mobile nav are clickable
  const navLinks = mobileNav.querySelectorAll('a, button');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.stopPropagation();
      // Close menu when a link is clicked
      if (!this.classList.contains('mobile-nav__close') &&
          !this.classList.contains('currency-option')) {
        closeMobileNav();
      }
    });
  });

  // Add keyboard navigation (ESC to close)
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileNav.style.visibility === 'visible') {
      closeMobileNav();
    }
  });

  // Expose functions globally for use by other components
  window.MobileNavController = {
    initialized: true,
    open: openMobileNav,
    close: closeMobileNav
  };
});