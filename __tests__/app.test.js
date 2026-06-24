/**
 * @jest-environment jsdom
 */

/* --- IntersectionObserver mock (jsdom does not ship one) --- */
var ioInstances = [];

beforeEach(function () {
  ioInstances = [];

  global.IntersectionObserver = jest.fn(function (callback, options) {
    this._callback = callback;
    this._options = options;
    this._observed = [];
    this.observe = jest.fn(function (el) { this._observed.push(el); }.bind(this));
    this.unobserve = jest.fn();
    this.disconnect = jest.fn();
    ioInstances.push(this);
  });
});

var app = require('../js/app');

/* ---------- helpers ---------- */

function makeHamburger() {
  var btn = document.createElement('button');
  btn.id = 'hamburger';
  document.body.appendChild(btn);
  return btn;
}

function makeMobileMenu() {
  var nav = document.createElement('nav');
  nav.id = 'mobileMenu';
  document.body.appendChild(nav);
  return nav;
}

/* ============================
   initMobileMenu
   ============================ */

describe('initMobileMenu', function () {
  var hamburger;
  var mobileMenu;

  beforeEach(function () {
    document.body.innerHTML = '';
    hamburger = makeHamburger();
    mobileMenu = makeMobileMenu();
  });

  test('toggle adds "active" class on first click', function () {
    app.initMobileMenu(hamburger, mobileMenu);
    hamburger.click();

    expect(hamburger.classList.contains('active')).toBe(true);
    expect(mobileMenu.classList.contains('active')).toBe(true);
  });

  test('toggle removes "active" class on second click', function () {
    app.initMobileMenu(hamburger, mobileMenu);
    hamburger.click();
    hamburger.click();

    expect(hamburger.classList.contains('active')).toBe(false);
    expect(mobileMenu.classList.contains('active')).toBe(false);
  });

  test('close removes "active" class regardless of current state', function () {
    var menu = app.initMobileMenu(hamburger, mobileMenu);
    hamburger.click(); // open
    menu.close();

    expect(hamburger.classList.contains('active')).toBe(false);
    expect(mobileMenu.classList.contains('active')).toBe(false);
  });

  test('close is idempotent when menu is already closed', function () {
    var menu = app.initMobileMenu(hamburger, mobileMenu);
    menu.close();

    expect(hamburger.classList.contains('active')).toBe(false);
    expect(mobileMenu.classList.contains('active')).toBe(false);
  });

  test('clicking outside hamburger and menu closes it', function () {
    app.initMobileMenu(hamburger, mobileMenu);
    hamburger.click(); // open

    // Simulate a click on the document body (outside both elements)
    var outsideEl = document.createElement('div');
    document.body.appendChild(outsideEl);
    outsideEl.click();

    expect(hamburger.classList.contains('active')).toBe(false);
    expect(mobileMenu.classList.contains('active')).toBe(false);
  });

  test('clicking inside the mobile menu does NOT close it', function () {
    app.initMobileMenu(hamburger, mobileMenu);
    hamburger.click(); // open

    var menuChild = document.createElement('a');
    mobileMenu.appendChild(menuChild);
    menuChild.click();

    expect(hamburger.classList.contains('active')).toBe(true);
    expect(mobileMenu.classList.contains('active')).toBe(true);
  });

  test('returned object exposes toggle and close functions', function () {
    var menu = app.initMobileMenu(hamburger, mobileMenu);
    expect(typeof menu.toggle).toBe('function');
    expect(typeof menu.close).toBe('function');
  });
});

/* ============================
   initSmoothScroll
   ============================ */

describe('initSmoothScroll', function () {
  beforeEach(function () {
    document.body.innerHTML = '';
  });

  test('prevents default and calls scrollIntoView for valid hash links', function () {
    var section = document.createElement('section');
    section.id = 'about';
    document.body.appendChild(section);
    section.scrollIntoView = jest.fn();

    var link = document.createElement('a');
    link.setAttribute('href', '#about');
    document.body.appendChild(link);

    app.initSmoothScroll(document);

    var event = new Event('click', { bubbles: true, cancelable: true });
    link.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
    expect(section.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  test('does NOT prevent default for href="#"', function () {
    var link = document.createElement('a');
    link.setAttribute('href', '#');
    document.body.appendChild(link);

    app.initSmoothScroll(document);

    var event = new Event('click', { bubbles: true, cancelable: true });
    link.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(false);
  });

  test('handles missing target gracefully (no error thrown)', function () {
    var link = document.createElement('a');
    link.setAttribute('href', '#nonexistent');
    document.body.appendChild(link);

    app.initSmoothScroll(document);

    expect(function () {
      link.click();
    }).not.toThrow();
  });

  test('attaches listeners to multiple anchor links', function () {
    var sectionA = document.createElement('section');
    sectionA.id = 'services';
    document.body.appendChild(sectionA);
    sectionA.scrollIntoView = jest.fn();

    var sectionB = document.createElement('section');
    sectionB.id = 'contact';
    document.body.appendChild(sectionB);
    sectionB.scrollIntoView = jest.fn();

    var linkA = document.createElement('a');
    linkA.setAttribute('href', '#services');
    document.body.appendChild(linkA);

    var linkB = document.createElement('a');
    linkB.setAttribute('href', '#contact');
    document.body.appendChild(linkB);

    app.initSmoothScroll(document);

    linkA.dispatchEvent(new Event('click', { bubbles: true, cancelable: true }));
    linkB.dispatchEvent(new Event('click', { bubbles: true, cancelable: true }));

    expect(sectionA.scrollIntoView).toHaveBeenCalledTimes(1);
    expect(sectionB.scrollIntoView).toHaveBeenCalledTimes(1);
  });
});

/* ============================
   initFadeInObserver
   ============================ */

describe('initFadeInObserver', function () {
  beforeEach(function () {
    document.body.innerHTML = '';
  });

  test('sets initial opacity to 0 on .fade-in elements', function () {
    var el = document.createElement('div');
    el.classList.add('fade-in');
    document.body.appendChild(el);

    app.initFadeInObserver(document);

    expect(el.style.opacity).toBe('0');
  });

  test('returns the observer created by IntersectionObserver', function () {
    var observer = app.initFadeInObserver(document);
    expect(global.IntersectionObserver).toHaveBeenCalledTimes(1);
    expect(observer).toBe(ioInstances[0]);
  });

  test('observes every .fade-in element', function () {
    var el1 = document.createElement('div');
    el1.classList.add('fade-in');
    document.body.appendChild(el1);

    var el2 = document.createElement('div');
    el2.classList.add('fade-in');
    document.body.appendChild(el2);

    app.initFadeInObserver(document);

    var observer = ioInstances[0];
    expect(observer.observe).toHaveBeenCalledTimes(2);
    expect(observer.observe).toHaveBeenCalledWith(el1);
    expect(observer.observe).toHaveBeenCalledWith(el2);
  });

  test('sets opacity to 1 and unobserves when element intersects', function () {
    var el = document.createElement('div');
    el.classList.add('fade-in');
    document.body.appendChild(el);

    app.initFadeInObserver(document);

    var observer = ioInstances[0];
    observer._callback([{ isIntersecting: true, target: el }]);

    expect(el.style.opacity).toBe('1');
    expect(observer.unobserve).toHaveBeenCalledWith(el);
  });

  test('does NOT change opacity when element is not intersecting', function () {
    var el = document.createElement('div');
    el.classList.add('fade-in');
    document.body.appendChild(el);

    app.initFadeInObserver(document);
    el.style.opacity = '0';

    var observer = ioInstances[0];
    observer._callback([{ isIntersecting: false, target: el }]);

    expect(el.style.opacity).toBe('0');
  });

  test('handles zero .fade-in elements without errors', function () {
    expect(function () {
      app.initFadeInObserver(document);
    }).not.toThrow();
  });
});
