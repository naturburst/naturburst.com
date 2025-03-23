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

  // Improved open function with direct manipulation and logging
  function openMobileNav() {
    console.log('Opening mobile nav');
    mobileNav.style.transform = 'translateX(0)';
    mobileNav.style.visibility = 'visible';
    mobileNavOverlay.style.opacity = '1';
    mobileNavOverlay.style.visibility = 'visible';
    mobileNavOverlay.style.pointerEvents = 'auto';
    body.style.overflow = 'hidden';
    body.classList.add('mobile-menu-open');
  }

  // Improved close function with direct manipulation and logging
  function closeMobileNav() {
    console.log('Closing mobile nav');
    mobileNav.style.transform = 'translateX(-100%)';
    mobileNav.style.visibility = 'hidden';
    mobileNavOverlay.style.opacity = '0';
    mobileNavOverlay.style.visibility = 'hidden';
    mobileNavOverlay.style.pointerEvents = 'none';
    body.style.overflow = '';
    body.classList.remove('mobile-menu-open');
  }

  // Clear any existing event listeners for toggle button
  const newToggle = mobileNavToggle.cloneNode(true);
  mobileNavToggle.parentNode.replaceChild(newToggle, mobileNavToggle);

  // Add enhanced event listeners for both click and touch events
  newToggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Toggle button clicked');
    openMobileNav();
  });

  // Clear any existing listeners on close button with enhanced handling
  if (mobileNavClose) {
    const newClose = mobileNavClose.cloneNode(true);
    mobileNavClose.parentNode.replaceChild(newClose, mobileNavClose);

    // Multiple event types for better mobile support
    ['click', 'touchend'].forEach(eventType => {
      newClose.addEventListener(eventType, function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Close button ' + eventType);
        closeMobileNav();
      });
    });
  }

  // Clear any existing listeners on overlay
  const newOverlay = mobileNavOverlay.cloneNode(true);
  mobileNavOverlay.parentNode.replaceChild(newOverlay, mobileNavOverlay);

  newOverlay.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Overlay clicked');
    closeMobileNav();
  });

  // Make sure all links in the mobile nav are clickable
  const navLinks = mobileNav.querySelectorAll('a, button');
  navLinks.forEach(link => {
    const newLink = link.cloneNode(true);
    link.parentNode.replaceChild(newLink, link);

    newLink.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  });

  // Add essential styles directly to ensure everything works
  const styles = `
    .mobile-nav {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 85% !important;
      max-width: 350px !important;
      height: 100vh !important;
      z-index: 1001 !important;
      background: white !important;
      transform: translateX(-100%) !important;
      transition: transform 0.3s !important;
      visibility: hidden !important;
      overflow-y: auto !important;
      box-shadow: 0 0 20px rgba(0,0,0,0.2) !important;
    }

    .mobile-nav * {
      pointer-events: auto !important;
    }

    .mobile-nav-overlay {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      background: rgba(0,0,0,0.5) !important;
      z-index: 1000 !important;
      opacity: 0 !important;
      visibility: hidden !important;
      transition: opacity 0.3s, visibility 0.3s !important;
      pointer-events: none !important;
    }

    .mobile-nav__close {
      position: relative !important;
      z-index: 1010 !important;
      background: transparent !important;
      border: none !important;
      color: #1a2e37 !important;
      font-size: 1.5rem !important;
      cursor: pointer !important;
      padding: 0.75rem !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      transition: transform 0.2s ease !important;
    }

    .mobile-nav__close:hover {
      transform: scale(1.1) !important;
    }

    body.mobile-menu-open {
      position: fixed;
      width: 100%;
      height: 100%;
    }
  `;

  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerHTML = styles;
  document.head.appendChild(styleSheet);

  // Add keyboard navigation (ESC to close)
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileNav.style.visibility === 'visible') {
      closeMobileNav();
    }
  });
});