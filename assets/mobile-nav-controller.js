// Enhanced mobile navigation controller with improved reliability
document.addEventListener('DOMContentLoaded', function() {
  const mobileNav         = document.getElementById('MobileNav');
  const mobileNavToggle   = document.querySelector('.mobile-nav-toggle');
  const mobileNavClose    = document.querySelector('.mobile-nav__close');
  let   mobileNavOverlay  = document.getElementById('MobileNavOverlay');
  const body              = document.body;

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

  // Function to fix currency selector display issues
  function fixCurrencySelector() {
    const currencyOptions = document.querySelectorAll('.currency-option');
    if (currencyOptions.length > 0 && mobileNav.classList.contains('is-active')) {
      currencyOptions.forEach(option => {
        option.style.textAlign = 'center';
        option.style.margin = '5px 0';
        option.style.padding = '10px';
        option.style.width = '100%';
        option.style.borderRadius = '4px';
        option.style.color = '#1a2e37';
      });

      const activeCurrency = document.querySelector('.currency-option.active');
      if (activeCurrency) {
        activeCurrency.style.color = '#2A5E41';
        activeCurrency.style.backgroundColor = 'rgba(42, 94, 65, 0.1)';
        activeCurrency.style.fontWeight = 'bold';
      }

      // Try to determine current currency if no active class exists
      try {
        const currentCurrency = Shopify?.currency?.active ||
          document.querySelector('html')?.getAttribute('data-currency');

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

  function openMobileNav() {
    console.log('Opening mobile navigation');

    // Slide in the nav
    mobileNav.classList.add('is-active');
    mobileNav.setAttribute('aria-hidden', 'false');
    mobileNav.style.display = 'block';

    // Show overlay
    mobileNavOverlay.classList.add('is-active');
    mobileNavOverlay.style.pointerEvents = 'auto';

    // Prevent background scroll
    body.classList.add('mobile-menu-open');
    body.style.overflow = 'hidden';

    if (mobileNavToggle) {
      mobileNavToggle.setAttribute('aria-expanded', 'true');
    }

    // Small delay to ensure the DOM updated before styling
    setTimeout(fixCurrencySelector, 50);
  }

  function closeMobileNav() {
    console.log('Closing mobile navigation');

    mobileNav.classList.remove('is-active');
    mobileNav.setAttribute('aria-hidden', 'true');

    // Hide overlay
    mobileNavOverlay.classList.remove('is-active');
    mobileNavOverlay.style.pointerEvents = 'none';

    body.classList.remove('mobile-menu-open');
    body.style.overflow = '';

    if (mobileNavToggle) {
      mobileNavToggle.setAttribute('aria-expanded', 'false');
    }

    // Let the transition finish before removing display for better animation
    setTimeout(() => {
      if (!mobileNav.classList.contains('is-active')) {
        mobileNav.style.display = 'none';
      }
    }, 150);
  }

  // Button: open nav
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      openMobileNav();
    });
  }

  // Button: close nav
  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeMobileNav();
    });
  }

  // Overlay click also closes nav
  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeMobileNav();
    });
  }

  // Close nav on link clicks
  const navLinks = document.querySelectorAll('[data-nav-link]');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      closeMobileNav();
    });
  });

  // Close nav on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-active')) {
      closeMobileNav();
    }
  });

  // Expose functionality for other scripts
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
