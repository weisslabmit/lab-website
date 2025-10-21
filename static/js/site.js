(function () {
  // Find the menu panel used by Story theme variants
  var menu =
    document.getElementById('menu') ||
    document.querySelector('section#menu, nav#menu, .menu, [data-panel="menu"]');

  if (!menu) return;

  // Mark as loading so spinner shows and opacity is 0
  menu.classList.add('is-loading');

  // Inject spinner once
  if (!menu.querySelector('.menu-spinner')) {
    var s = document.createElement('span');
    s.className = 'menu-spinner';
    s.setAttribute('aria-hidden', 'true');
    s.setAttribute('title', 'Loading…');
    menu.appendChild(s);
  }

  // When the DOM is ready, fade the menu in (first time it becomes visible)
  window.requestAnimationFrame(function () {
    // mark ready (enables fade-in CSS)
    menu.classList.add('is-ready');
    menu.classList.remove('is-loading');
  });

  // If your theme toggles the panel via a link to #menu, replay fade on open
  var triggers = document.querySelectorAll('a[href="#menu"], [data-target="#menu"]');
  triggers.forEach(function (t) {
    t.addEventListener('click', function () {
      // replay fade on each open
      menu.classList.remove('is-ready');
      void menu.offsetWidth; // reflow
      menu.classList.add('is-ready');
    });
  });
})();
