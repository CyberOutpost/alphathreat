/* Alpha Threat Blog — index filtering and in-article table of contents.
   at.js handles the shared chrome (nav, back-to-top, scroll progress). */
(function () {
  'use strict';

  /* ---------- Index: category filter + title search ---------- */
  var grid = document.getElementById('post-grid');
  if (grid) {
    var cards = [].slice.call(grid.querySelectorAll('.post-card'));
    var buttons = [].slice.call(document.querySelectorAll('#cat-filters .filter'));
    var search = document.getElementById('q');
    var empty = document.getElementById('no-results');
    var cat = 'all';

    function apply() {
      var q = (search && search.value || '').trim().toLowerCase();
      var shown = 0;
      cards.forEach(function (card) {
        var inCat = cat === 'all' || (card.dataset.cats || '').indexOf(cat) !== -1;
        var inText = !q || (card.dataset.title || '').indexOf(q) !== -1;
        var show = inCat && inText;
        card.hidden = !show;
        if (show) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
    }

    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        buttons.forEach(function (x) { x.classList.remove('is-active'); });
        b.classList.add('is-active');
        cat = b.dataset.cat;
        apply();
      });
    });

    if (search) {
      search.addEventListener('input', apply);
      // Enter would submit nothing useful; keep focus in the field.
      search.addEventListener('keydown', function (e) { if (e.key === 'Enter') e.preventDefault(); });
    }
  }

  /* ---------- Article: build the TOC from the rendered headings ---------- */
  var toc = document.getElementById('toc');
  var body = document.querySelector('.post-body');
  if (toc && body) {
    var heads = [].slice.call(body.querySelectorAll('h2, h3'));
    var links = [];

    heads.forEach(function (h, i) {
      if (!h.id) {
        h.id = (h.textContent || '')
          .toLowerCase().trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '') || ('section-' + i);
      }
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      a.setAttribute('data-level', h.tagName === 'H3' ? '3' : '2');
      toc.appendChild(a);
      links.push({ a: a, h: h });
    });

    if (links.length) {
      var tick = function () {
        var top = window.scrollY + 140;
        var current = links[0];
        for (var i = 0; i < links.length; i++) {
          if (links[i].h.offsetTop <= top) current = links[i];
        }
        links.forEach(function (l) { l.a.classList.toggle('is-current', l === current); });
      };
      var queued = false;
      window.addEventListener('scroll', function () {
        if (queued) return;
        queued = true;
        window.requestAnimationFrame(function () { tick(); queued = false; });
      }, { passive: true });
      tick();
    }
  }

  /* ---------- Wrap wide tables so the page itself never scrolls sideways ---------- */
  if (body) {
    [].slice.call(body.querySelectorAll('table')).forEach(function (t) {
      if (t.parentNode && t.parentNode.classList.contains('table-scroll')) return;
      var wrap = document.createElement('div');
      wrap.className = 'table-scroll';
      wrap.style.overflowX = 'auto';
      t.parentNode.insertBefore(wrap, t);
      wrap.appendChild(t);
    });
  }
})();
