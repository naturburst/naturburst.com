document.addEventListener('DOMContentLoaded', function() {
  const mobileNav         = document.getElementById('MobileNav');
  const mobileNavToggle   = document.querySelector('.mobile-nav-toggle');
  const mobileNavClose    = document.querySelector('.mobile-nav__close');
  let   mobileNavOverlay  = document.getElementById('MobileNavOverlay');
  const body              = document.body;

  // Exit if mobile nav doesn't exist
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

  // Simplified fixCurrencySelector to just add .active classes
  function fixCurrencySelector() {
    const currencyOptions = document.querySelectorAll('.currency-option');
    if (currencyOptions.length > 0 && mobileNav.classList.contains('is-active')) {
      // Remove 'active' from all
      currencyOptions.forEach(option => option.classList.remove('active'));

      // Try to determine current currency
      try {
        const currentCurrency = Shopify?.currency?.active ||
          document.querySelector('html')?.getAttribute('data-currency');

        if (currentCurrency) {
          const currentOption = document.querySelector(
            `.currency-option[value="${currentCurrency}"]`
          );
          if (currentOption) {
            currentOption.classList.add('active');
          }
        }
      } catch (e) {
        console.warn('Could not determine active currency:', e);
      }
    }
  }

  function openMobileNav() {
    mobileNav.classList.add('is-active');
    mobileNav.setAttribute('aria-hidden', 'false');
    mobileNav.style.display = 'block';

    mobileNavOverlay.classList.add('is-active');
    mobileNavOverlay.style.pointerEvents = 'auto';

    body.classList.add('mobile-menu-open');
    body.style.overflow = 'hidden';

    if (mobileNavToggle) {
      mobileNavToggle.setAttribute('aria-expanded', 'true');
    }

    // Call fixCurrencySelector after a short delay
    setTimeout(fixCurrencySelector, 50);
  }

  function closeMobileNav() {
    mobileNav.classList.remove('is-active');
    mobileNav.setAttribute('aria-hidden', 'true');

    mobileNavOverlay.classList.remove('is-active');
    mobileNavOverlay.style.pointerEvents = 'none';

    body.classList.remove('mobile-menu-open');
    body.style.overflow = '';

    if (mobileNavToggle) {
      mobileNavToggle.setAttribute('aria-expanded', 'false');
    }

    // Let the transition finish
    setTimeout(() => {
      if (!mobileNav.classList.contains('is-active')) {
        mobileNav.style.display = 'none';
      }
    }, 150);
  }

  // Event listeners
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      openMobileNav();
    });
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      closeMobileNav();
    });
  }

  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      closeMobileNav();
    });
  }

  // Close nav on link clicks
  const navLinks = document.querySelectorAll('[data-nav-link]');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileNav();
    });
  });

  // Close nav on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-active')) {
      closeMobileNav();
    }
  });

  // Expose to window
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
