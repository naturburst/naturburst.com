// COMPLETELY REPLACE mobile-nav-controller.js with this code
document.addEventListener('DOMContentLoaded', function() {
  // Direct references to needed elements
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileNav = document.getElementById('MobileNav');
  const mobileNavClose = document.querySelector('.mobile-nav__close');
  const mobileNavOverlay = document.getElementById('MobileNavOverlay');
  const body = document.body;

  // Exit if elements don't exist
  if (!mobileNavToggle || !mobileNav) return;

  // Create overlay if it doesn't exist
  if (!mobileNavOverlay) {
    const overlay = document.createElement('div');
    overlay.id = 'MobileNavOverlay';
    overlay.className = 'mobile-nav-overlay';
    document.body.appendChild(overlay);
  }

  // Simple open function with direct manipulation
  function openMobileNav() {
    mobileNav.style.transform = 'translateX(0)';
    mobileNav.style.visibility = 'visible';
    mobileNavOverlay.style.opacity = '1';
    mobileNavOverlay.style.visibility = 'visible';
    mobileNavOverlay.style.pointerEvents = 'auto';
    body.style.overflow = 'hidden';
  }

  // Simple close function with direct manipulation
  function closeMobileNav() {
    mobileNav.style.transform = 'translateX(-100%)';
    mobileNav.style.visibility = 'hidden';
    mobileNavOverlay.style.opacity = '0';
    mobileNavOverlay.style.visibility = 'hidden';
    mobileNavOverlay.style.pointerEvents = 'none';
    body.style.overflow = '';
  }

  // Simple toggle function
  function toggleMobileNav() {
    if (mobileNav.style.visibility === 'visible') {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  }

  // Clear any existing event listeners
  const newToggle = mobileNavToggle.cloneNode(true);
  mobileNavToggle.parentNode.replaceChild(newToggle, mobileNavToggle);

  // Add event listeners for both click and touch events
  newToggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    openMobileNav();
  });

  // Clear any existing listeners on close button
  if (mobileNavClose) {
    const newClose = mobileNavClose.cloneNode(true);
    mobileNavClose.parentNode.replaceChild(newClose, mobileNavClose);

    newClose.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeMobileNav();
    });
  }

  // Clear any existing listeners on overlay
  const newOverlay = mobileNavOverlay.cloneNode(true);
  mobileNavOverlay.parentNode.replaceChild(newOverlay, mobileNavOverlay);

  newOverlay.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
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
      position: fixed;
      top: 0;
      left: 0;
      width: 85%;
      max-width: 350px;
      height: 100vh;
      z-index: 1001;
      background: white;
      transform: translateX(-100%);
      transition: transform 0.3s;
      visibility: hidden;
      overflow-y: auto;
      box-shadow: 0 0 20px rgba(0,0,0,0.2);
    }

    .mobile-nav * {
      pointer-events: auto !important;
    }

    .mobile-nav-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s;
      pointer-events: none;
    }
  `;

  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerHTML = styles;
  document.head.appendChild(styleSheet);
});