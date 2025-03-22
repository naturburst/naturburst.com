// Single-source mobile navigation controller
document.addEventListener('DOMContentLoaded', function() {
  // Get elements once
  const mobileNav = document.getElementById('MobileNav');
  const mobileNavOverlay = document.getElementById('MobileNavOverlay');
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileNavClose = document.querySelector('.mobile-nav__close');
  const body = document.body;

  // Disable any previous handlers by creating a global flag
  window.mobileNavInitialized = true;

  // Add debug mode for troubleshooting
  const debug = true;

  // Log function that only runs in debug mode
  function debugLog(...args) {
    if (debug) console.log(...args);
  }

  // Exit if required elements don't exist
  if (!mobileNav || !mobileNavToggle) {
    console.warn('Mobile navigation elements not found');
    return;
  }

  // Single toggle function that all events will use
  function toggleMobileNav(e) {
    // Prevent default only for buttons and links
    if (e && e.preventDefault && (e.target.tagName === 'A' || e.target.tagName === 'BUTTON')) {
      e.preventDefault();
    }

    debugLog('Toggle event triggered by', e?.target);

    // Toggle classes
    mobileNav.classList.toggle('is-active');
    if (mobileNavOverlay) {
      mobileNavOverlay.classList.toggle('is-active');
    }
    body.classList.toggle('overflow-hidden');

    // Track state for debugging
    const isOpen = mobileNav.classList.contains('is-active');

    // Update ARIA attributes
    mobileNav.setAttribute('aria-hidden', !isOpen);
    mobileNavToggle.setAttribute('aria-expanded', isOpen);

    debugLog('Menu is now', isOpen ? 'OPEN' : 'CLOSED');

    // Return true to allow the event to continue
    return true;
  }

  // Attach open button handler
  debugLog('Attaching click handler to mobile toggle button');
  mobileNavToggle.addEventListener('click', toggleMobileNav);

  // Attach close button handler
  if (mobileNavClose) {
    debugLog('Attaching click handler to close button');
    mobileNavClose.addEventListener('click', toggleMobileNav);
  }

  // Attach overlay handler
  if (mobileNavOverlay) {
    debugLog('Attaching click handler to overlay');
    mobileNavOverlay.addEventListener('click', toggleMobileNav);
  }

  // Escape key handler
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-active')) {
      debugLog('Escape key pressed, closing menu');
      toggleMobileNav(e);
    }
  });

  // Debug mode HTML inspection
  if (debug) {
    // Check for pointer-event issues
    const styles = getComputedStyle(mobileNav);
    debugLog('Mobile nav CSS pointer-events:', styles.pointerEvents);

    // Set explicit data attribute for testing
    mobileNav.setAttribute('data-clickable', 'true');

    // Make nav links report when clicked
    const allLinks = mobileNav.querySelectorAll('a, button');
    allLinks.forEach(link => {
      // Store original click handler if any
      const originalClick = link.onclick;

      // Add debug click handler
      link.onclick = function(e) {
        debugLog('Link clicked:', this.textContent.trim() || this.className);

        // Call original handler if it exists
        if (typeof originalClick === 'function') {
          return originalClick.call(this, e);
        }

        // Let event continue normally
        return true;
      };
    });
  }

  debugLog('Mobile navigation initialization complete');
});