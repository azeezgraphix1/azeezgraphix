/**
 * AzeezgraphiX site interactive functionality.
 *
 * Handles mobile-menu toggling, smooth-scroll navigation,
 * and scroll-triggered fade-in animations via IntersectionObserver.
 */

/**
 * Initialise the mobile hamburger menu.
 *
 * Toggles the `active` class on both the hamburger button and the
 * mobile-menu element.  Clicking anywhere outside closes the menu.
 *
 * @param {HTMLElement} hamburger  – the hamburger button element
 * @param {HTMLElement} mobileMenu – the mobile-menu container element
 * @returns {{ toggle: Function, close: Function }}
 */
function initMobileMenu(hamburger, mobileMenu) {
  function toggle() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  }

  function close() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
  }

  hamburger.addEventListener('click', toggle);

  document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      close();
    }
  });

  return { toggle: toggle, close: close };
}

/**
 * Set up smooth-scroll behaviour for every same-page anchor link.
 *
 * Links whose `href` is exactly `"#"` are ignored.
 *
 * @param {Document | HTMLElement} root – scope to query anchors within
 */
function initSmoothScroll(root) {
  root.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

/**
 * Observe `.fade-in` elements and reveal them when they scroll into view.
 *
 * Each matching element starts with `opacity: 0`.  Once it crosses the
 * intersection threshold it is set to `opacity: 1` and unobserved.
 *
 * @param {Document | HTMLElement} root – scope to query `.fade-in` elements
 * @returns {IntersectionObserver} the observer instance (useful for testing)
 */
function initFadeInObserver(root) {
  var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  root.querySelectorAll('.fade-in').forEach(function (el) {
    el.style.opacity = '0';
    observer.observe(el);
  });

  return observer;
}

/* ---- Bootstrap when running in the browser ---- */
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    var hamburger = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobileMenu');

    if (hamburger && mobileMenu) {
      initMobileMenu(hamburger, mobileMenu);
      // Expose close globally for inline onclick handlers
      window.closeMobileMenu = initMobileMenu(hamburger, mobileMenu).close;
    }

    initSmoothScroll(document);
    initFadeInObserver(document);
  });
}

/* ---- Exports for testing ---- */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initMobileMenu: initMobileMenu, initSmoothScroll: initSmoothScroll, initFadeInObserver: initFadeInObserver };
}
