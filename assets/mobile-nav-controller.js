/**
 * Complete Mobile Navigation Fix
 * This script fixes:
 * - First click not opening the menu
 * - Links not being clickable
 * - Proper overlay handling
 */
document.addEventListener('DOMContentLoaded', function() {
  // Prevent any other scripts from initializing mobile nav
  window.mobileNavAlreadyInitialized = true;
  window.MobileNavController = { initialized: true };

  // Core elements - using 'let' so we can reassign them later
  let mobileNav = document.getElementById('MobileNav');
  let mobileNavOverlay = document.getElementById('MobileNavOverlay');
  let mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  let mobileNavClose = document.querySelector('.mobile-nav__close');
  const body = document.body;

  // Exit early if required elements are missing
  if (!mobileNav || !mobileNavToggle) {
    console.error('Mobile nav elements not found');
    return;
  }

  // Apply crucial CSS fixes immediately
  applyEmergencyCSSFixes();

  // Create overlay if it doesn't exist
  ensureOverlayExists();

  // Clean up any existing click handlers to prevent duplicates
  cleanupExistingHandlers();

  // Toggle function for the mobile navigation
  function toggleMobileNav(e) {
    if (e) e.preventDefault();

    console.log('MobileNavController: Toggle triggered');

    // Handle menu state
    const isOpen = mobileNav.classList.contains('is-active');
    const willBeOpen = !isOpen;

    // Toggle classes
    mobileNav.classList.toggle('is-active');
    mobileNavOverlay.classList.toggle('is-active');
    body.classList.toggle('overflow-hidden', willBeOpen);

    // Aria attributes
    mobileNav.setAttribute('aria-hidden', String(!willBeOpen));
    mobileNavToggle.setAttribute('aria-expanded', String(willBeOpen));

    // Handle focus trapping
    if (window.theme && window.theme.a11y) {
      if (willBeOpen) {
        window.theme.a11y.trapFocus(mobileNav);
        console.log('MobileNavController: Focus trapped in menu');
      } else {
        window.theme.a11y.removeTrapFocus();
        console.log('MobileNavController: Focus trap removed');
      }
    }

    console.log('MobileNavController: Menu is now ' + (willBeOpen ? 'OPEN' : 'CLOSED'));
  }

  // Close function specifically for links
  function closeMenuForNavigation() {
    console.log('MobileNavController: Navigation link clicked, closing menu');

    // Simply close everything
    mobileNav.classList.remove('is-active');
    mobileNavOverlay.classList.remove('is-active');
    body.classList.remove('overflow-hidden');

    // Update accessibility attributes
    mobileNav.setAttribute('aria-hidden', 'true');
    mobileNavToggle.setAttribute('aria-expanded', 'false');

    // Remove focus trap
    if (window.theme && window.theme.a11y) {
      window.theme.a11y.removeTrapFocus();
    }
  }

  // Ensure the overlay exists
  function ensureOverlayExists() {
    if (!mobileNavOverlay) {
      console.log('MobileNavController: Creating missing overlay');
      mobileNavOverlay = document.createElement('div');
      mobileNavOverlay.id = 'MobileNavOverlay';
      mobileNavOverlay.className = 'mobile-nav-overlay';
      document.body.appendChild(mobileNavOverlay);
    }
  }

  // Apply critical CSS fixes
  function applyEmergencyCSSFixes() {
    const style = document.createElement('style');
    style.textContent = `
      /* Critical mobile nav fixes */
      .mobile-nav-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        pointer-events: none;
      }

      .mobile-nav-overlay.is-active {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
      }

      .mobile-nav {
        z-index: 1000;
        pointer-events: auto !important;
      }

      .mobile-nav.is-active {
        transform: translateX(0) !important;
        visibility: visible !important;
        pointer-events: auto !important;
      }

      .mobile-nav__link,
      .account-link,
      .currency-option,
      .mobile-nav__close,
      .contact-btn {
        pointer-events: auto !important;
        position: relative !important;
        z-index: 1001 !important;
      }

      .mobile-nav__inner * {
        pointer-events: auto !important;
      }

      body.overflow-hidden {
        overflow: hidden !important;
      }
    `;
    document.head.appendChild(style);
    console.log('MobileNavController: Emergency CSS fixes applied');
  }

  // Clean up existing handlers to prevent duplicates
  function cleanupExistingHandlers() {
    // Create fresh elements with cloned properties but no event handlers
    if (mobileNavToggle) {
      const newToggle = mobileNavToggle.cloneNode(true);
      mobileNavToggle.parentNode.replaceChild(newToggle, mobileNavToggle);
      mobileNavToggle = newToggle;
    }

    if (mobileNavClose) {
      const newClose = mobileNavClose.cloneNode(true);
      mobileNavClose.parentNode.replaceChild(newClose, mobileNavClose);
      mobileNavClose = newClose;
    }

    console.log('MobileNavController: Cleaned up existing handlers');
  }

  // Attach event listeners with direct event binding
  mobileNavToggle.addEventListener('click', toggleMobileNav);

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', toggleMobileNav);
  }

  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', toggleMobileNav);
  }

  // Add ESC key handler
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-active')) {
      toggleMobileNav();
    }
  });

  // Make sure all interactive elements are clickable
  const allMenuLinks = mobileNav.querySelectorAll('a, button, .account-link, .currency-option');

  allMenuLinks.forEach(item => {
    // Remove any existing click handlers with clone technique
    const newItem = item.cloneNode(true);
    item.parentNode.replaceChild(newItem, item);

    // For navigation links that should close the menu
    if (newItem.classList.contains('mobile-nav__link') ||
        newItem.classList.contains('account-link')) {
      // Store original href
      const href = newItem.getAttribute('href');

      // Only add special handling for links with real destinations
      if (href && href !== '#' && !href.startsWith('javascript:')) {
        newItem.addEventListener('click', function(e) {
          // Don't prevent default so the link still works
          closeMenuForNavigation();

          // Small delay to allow the menu to close before navigating
          if (!e.ctrlKey && !e.metaKey) { // Don't delay if opening in new tab
            e.preventDefault();
            setTimeout(() => {
              window.location.href = href;
            }, 50);
          }
        });
      }
    }
  });

  console.log('MobileNavController: Completely initialized');
});