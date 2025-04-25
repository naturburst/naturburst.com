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

  function animateNavItems() {
    // Get all animatable items
    const animateItems = document.querySelectorAll('.mobile-nav__animate-item');
    
    // Reset all animations first
    animateItems.forEach((item, index) => {
      // Set staggered delay based on item position
      const delay = 0.1 + (index * 0.05);
      item.style.setProperty('--item-delay', `${delay}s`);
      
      // Reset the animation
      item.style.opacity = '0';
      item.style.transform = 'translateX(-20px)';
    });
    
    // Force reflow to ensure animations restart
    void mobileNav.offsetWidth;
    
    // Start animations
    requestAnimationFrame(() => {
      animateItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      });
    });
  }

  function openMobileNav() {
    // Show the nav first (display block) then animate in
    mobileNav.style.display = 'block';
    
    // Force a reflow before adding the active class for smooth animation
    void mobileNav.offsetWidth;
    
    // Start the animations
    requestAnimationFrame(() => {
      mobileNav.classList.add('is-active');
      mobileNav.setAttribute('aria-hidden', 'false');
      mobileNavOverlay.classList.add('is-active');
      mobileNavOverlay.style.pointerEvents = 'auto';
      
      // Add the body class to prevent scrolling
      body.classList.add('mobile-menu-open');
      body.style.overflow = 'hidden';
      
      if (mobileNavToggle) {
        mobileNavToggle.setAttribute('aria-expanded', 'true');
      }
      
      // Animate individual items with a small delay
      setTimeout(animateNavItems, 100);
      
      // Call fixCurrencySelector after animation completes
      setTimeout(fixCurrencySelector, 300);
    });
  }

  function closeMobileNav() {
    // First reset individual item animations
    const animateItems = document.querySelectorAll('.mobile-nav__animate-item');
    animateItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-20px)';
    });
    
    // Then start container animation out
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
    }, 500); // Match this with the transition duration
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

  // Close nav on link clicks with nice animation
  const navLinks = document.querySelectorAll('[data-nav-link]');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Add active state to the clicked link for visual feedback
      link.classList.add('active-link');
      
      // Animate out with delay to show the active state
      setTimeout(closeMobileNav, 150);
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
