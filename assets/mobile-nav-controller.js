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

  // Function to fix currency selector display issues - FIXED
  function fixCurrencySelector() {
    const currencyOptions = document.querySelectorAll('.currency-option');
    if (currencyOptions.length > 0) {
      // Fix ONLY when mobile nav is active
      if (!mobileNav.classList.contains('is-active')) {
        return; // Don't apply fixes if mobile nav is not active
      }

      // Add appropriate styling while preserving visibility states
      currencyOptions.forEach(option => {
        // Don't force visibility - let CSS handle initial state
        // Just apply consistent styling
        option.style.textAlign = 'center';
        option.style.margin = '5px 0';
        option.style.padding = '10px';
        option.style.width = '100%';
        option.style.borderRadius = '4px';
        option.style.color = '#1a2e37'; // Dark color for standard options
      });

      // Style the active currency differently (if any)
      const activeCurrency = document.querySelector('.currency-option.active');
      if (activeCurrency) {
        activeCurrency.style.color = '#2A5E41'; // Green color for active
        activeCurrency.style.backgroundColor = 'rgba(42, 94, 65, 0.1)'; // Light green background
        activeCurrency.style.fontWeight = 'bold';
      }

      // Try to determine current currency if no active class exists
      // REMOVED HARDCODED INR FALLBACK
      try {
        const currentCurrency = Shopify?.currency?.active ||
                              document.querySelector('html').getAttribute('data-currency');

        // Only proceed if we found a valid currency
        if (currentCurrency) {
          const currentOption = document.querySelector(`.currency-option[value="${currentCurrency}"]`);

          if (currentOption && !currentOption.classList.contains('active')) {
            currentOption.classList.add('active');
            currentOption.style.color = '#2A5E41';
            currentOption.style.backgroundColor = 'rgba(42, 94, 65, 0.1)';
            currentOption.style.fontWeight = 'bold';
          }
        }
      } catch (e) {
        console.warn('Could not determine active currency:', e);
      }
    }
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

    // Fix currency selector after opening
    // Small delay to ensure DOM has updated
    setTimeout(fixCurrencySelector, 50);
  }

  // Improved close function with immediate actions
  function closeMobileNav() {
    console.log('Closing mobile navigation');

    // Hide problematic elements first
    const accountLinks = document.querySelectorAll('.account-link');
    const currencyOptions = document.querySelectorAll('.currency-option');

    [...accountLinks, ...currencyOptions].forEach(el => {
      el.style.visibility = 'hidden';
    });

    // Apply styles directly
    mobileNav.style.transform = 'translateX(-100%)';
    mobileNav.style.visibility = 'hidden';

    // Add a small delay before removing the element from accessibility flow
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
    link.addEventListener('click', function() {
      closeMobileNav();
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