<script>
document.addEventListener('DOMContentLoaded', function () {
  var menu = document.getElementById('menu');
  if (!menu) return;

  // put menu in loading state (shows spinner, hides content)
  menu.classList.add('is-loading');

  // inject spinner if it doesn't exist
  if (!menu.querySelector('.menu-spinner')) {
    var s = document.createElement('span');
    s.className = 'menu-spinner';
    s.setAttribute('aria-hidden', 'true');
    s.setAttribute('title', 'Loading…');
    menu.appendChild(s);
  }

  // when DOM is ready, reveal menu with fade; remove loading
  requestAnimationFrame(function () {
    menu.classList.add('is-ready');
    menu.classList.remove('is-loading');
  });

  // ensure the fade runs each time the menu is opened (if your theme toggles #menu via links)
  var triggers = document.querySelectorAll('a[href="#menu"], [data-target="#menu"]');
  triggers.forEach(function (t) {
    t.addEventListener('click', function () {
      // re-trigger transition on open
      menu.classList.remove('is-ready');
      // force reflow
      void menu.offsetWidth;
      menu.classList.add('is-ready');
    });
  });
});
</script>
