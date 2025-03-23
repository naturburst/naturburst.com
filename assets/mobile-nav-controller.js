document.addEventListener('DOMContentLoaded', function() {
  // Create a global controller object to avoid initialization conflicts
  window.MobileNavController = window.MobileNavController || {};

  // Skip if already initialized to prevent duplicate event listeners
  if (window.MobileNavController.initialized) return;

  // Core elements
  const mobileNav = document.getElementById('MobileNav');
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileNavClose = document.querySelector('.mobile-nav__close');
  const body = document.body;

  // Exit if essential elements are missing
  if (!mobileNav || !mobileNavToggle) {
    console.error('Mobile nav elements not found:', {
      mobileNav: !!mobileNav,
      mobileNavToggle: !!mobileNavToggle
    });
    return;
  }

  // Create and configure overlay
  let mobileNavOverlay = document.getElementById('MobileNavOverlay');
  if (!mobileNavOverlay) {
    mobileNavOverlay = document.createElement('div');
    mobileNavOverlay.id = 'MobileNavOverlay';
    mobileNavOverlay.className = 'mobile-nav-overlay';
    document.body.appendChild(mobileNavOverlay);
  }

  // Apply critical CSS fixes
  function applyRequiredStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* Mobile nav overlay */
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

      /* Menu container */
      .mobile-nav {
        z-index: 1000;
        pointer-events: auto !important;
      }

      .mobile-nav.is-active {
        transform: translateX(0) !important;
        visibility: visible !important;
      }

      /* Ensure all interactive elements are clickable */
      .mobile-nav__inner * {
        pointer-events: auto !important;
      }

      .mobile-nav__link,
      .account-link,
      .currency-option,
      .mobile-nav__close,
      .contact-btn {
        position: relative !important;
        z-index: 10 !important;
      }

      /* Prevent page scrolling when menu is open */
      body.overflow-hidden {
        overflow: hidden !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Toggle the mobile menu state
  function toggleMobileNav(e) {
    if (e) {
      e.preventDefault();
      console.log('Toggle event triggered by:', e.currentTarget.className);
    }

    const isOpen = mobileNav.classList.contains('is-active');
    const willBeOpen = !isOpen;

    console.log('Mobile nav state change:', isOpen ? 'open → close' : 'closed → open');

    // Update UI state
    mobileNav.classList.toggle('is-active');
    mobileNavOverlay.classList.toggle('is-active');
    body.classList.toggle('overflow-hidden', willBeOpen);

    // Update accessibility attributes
    mobileNav.setAttribute('aria-hidden', String(!willBeOpen));
    mobileNavToggle.setAttribute('aria-expanded', String(willBeOpen));

    // Handle focus management
    if (window.theme && window.theme.a11y) {
      if (willBeOpen) {
        window.theme.a11y.trapFocus(mobileNav);
      } else {
        window.theme.a11y.removeTrapFocus();
      }
    }
  }

  // Close the menu without toggling
  function closeMenu() {
    console.log('Closing mobile nav');
    mobileNav.classList.remove('is-active');
    mobileNavOverlay.classList.remove('is-active');
    body.classList.remove('overflow-hidden');

    mobileNav.setAttribute('aria-hidden', 'true');
    mobileNavToggle.setAttribute('aria-expanded', 'false');

    if (window.theme && window.theme.a11y) {
      window.theme.a11y.removeTrapFocus();
    }
  }

  // Close the menu and navigate to a link
  function handleNavLinkClick(e) {
    const link = e.currentTarget;
    const href = link.getAttribute('href');

    // Only handle actual navigation links
    if (href && href !== '#' && !href.startsWith('javascript:')) {
      // Stop event from bubbling to parent elements
      e.stopPropagation();

      // Allow normal behavior for ctrl/cmd+click (open in new tab)
      if (!e.ctrlKey && !e.metaKey) {
        e.preventDefault();

        // Close the menu
        closeMenu();

        // Navigate after brief delay to allow animation
        setTimeout(() => {
          window.location.href = href;
        }, 200);
      }
    }
  }

  // Apply the required styles
  applyRequiredStyles();

  // EVENT BINDINGS

  // Toggle button opens/closes the menu
  mobileNavToggle.addEventListener('click', function(e) {
    console.log('Mobile nav toggle clicked');
    toggleMobileNav(e);
  });

  // Close button in the menu
  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', function(e) {
      console.log('Mobile nav close clicked');
      toggleMobileNav(e);
    });
  }

  // Clicking the overlay closes the menu
  mobileNavOverlay.addEventListener('click', function(e) {
    console.log('Overlay clicked');
    toggleMobileNav(e);
  });

  // Escape key closes the menu
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-active')) {
      toggleMobileNav();
    }
  });

  // Make all navigation links clickable with proper behavior
  const navLinks = mobileNav.querySelectorAll('.mobile-nav__link, .account-link');
  navLinks.forEach(link => {
    link.addEventListener('click', handleNavLinkClick);
  });

  // Store reference to toggle function for external access
  window.MobileNavController = {
    initialized: true,
    toggle: toggleMobileNav,
    close: closeMenu
  };

  console.log('MobileNavController: Successfully initialized');
});