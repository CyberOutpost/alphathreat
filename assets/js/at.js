/* ==========================================================================
   Alpha Threat — Interactions  (assets/js/at.js)
   Vanilla JS, no dependencies. Everything degrades gracefully.
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Scroll progress + sticky nav + back-to-top ---------- */
  var bar = $('#scroll-progress');
  var nav = $('.nav');
  var toTop = $('.to-top');

  function onScroll() {
    var y = window.pageYOffset;
    if (bar) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
    if (nav) nav.classList.toggle('is-stuck', y > 18);
    if (toTop) toTop.classList.toggle('is-visible', y > 620);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Mobile nav ---------- */
  var burger = $('.nav__burger');
  var menu = $('.nav__menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  /* ---------- Dropdowns (click on touch/mobile, hover on desktop) ---------- */
  var desktop = window.matchMedia('(min-width: 1081px)');
  $$('.nav__item').forEach(function (item) {
    var trigger = $('.nav__link', item);
    if (!trigger) return;

    function close() { item.classList.remove('is-open'); trigger.setAttribute('aria-expanded', 'false'); }
    function open() { item.classList.add('is-open'); trigger.setAttribute('aria-expanded', 'true'); }

    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      var isOpen = item.classList.contains('is-open');
      $$('.nav__item').forEach(function (o) { if (o !== item) { o.classList.remove('is-open'); var t = $('.nav__link', o); if (t) t.setAttribute('aria-expanded', 'false'); } });
      isOpen ? close() : open();
    });
    item.addEventListener('mouseenter', function () { if (desktop.matches) open(); });
    item.addEventListener('mouseleave', function () { if (desktop.matches) close(); });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest || !e.target.closest('.nav__item')) {
      $$('.nav__item.is-open').forEach(function (o) {
        o.classList.remove('is-open');
        var t = $('.nav__link', o); if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    $$('.nav__item.is-open').forEach(function (o) { o.classList.remove('is-open'); });
    if (menu && menu.classList.contains('is-open') && burger) burger.click();
  });

  /* ---------- Scroll reveal + diagram draw + counters ---------- */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target;
      el.classList.add('is-visible');
      if (el.hasAttribute('data-count')) countUp(el);
      io.unobserve(el);
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }) : null;

  function observe(el) { if (io) { io.observe(el); } else { el.classList.add('is-visible'); if (el.hasAttribute('data-count')) countUp(el); } }
  $$('[data-reveal]').forEach(observe);
  $$('.diagram').forEach(observe);
  $$('[data-count]').forEach(observe);

  // stagger children of a revealed group
  $$('[data-reveal-group]').forEach(function (group) {
    $$('[data-reveal]', group).forEach(function (child, i) {
      child.style.transitionDelay = Math.min(i * 80, 560) + 'ms';
    });
  });

  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    if (isNaN(target)) return;
    if (reduced) { el.textContent = prefix + target + suffix; return; }
    var start = performance.now(), dur = 1500;
    (function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target % 1 ? (target * eased).toFixed(1) : Math.round(target * eased);
      el.textContent = prefix + val + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }

  /* ---------- SVG path draw lengths ---------- */
  $$('.diagram [data-draw]').forEach(function (p) {
    try { p.style.setProperty('--len', Math.ceil(p.getTotalLength()) + ''); } catch (e) { /* non-path */ }
  });

  /* ---------- Word rotator ---------- */
  $$('[data-rotate]').forEach(function (el) {
    var words;
    try { words = JSON.parse(el.getAttribute('data-rotate')); } catch (e) { return; }
    if (!words || !words.length) return;
    if (reduced) { el.textContent = words[0]; return; }
    var i = 0, txt = '', deleting = false;
    (function tick() {
      var full = words[i % words.length];
      txt = deleting ? full.substring(0, txt.length - 1) : full.substring(0, txt.length + 1);
      el.textContent = txt;
      var delta = deleting ? 45 : 82;
      if (!deleting && txt === full) { delta = 1900; deleting = true; }
      else if (deleting && txt === '') { deleting = false; i++; delta = 380; }
      setTimeout(tick, delta);
    })();
  });

  /* ---------- Terminal typewriter ---------- */
  var term = $('[data-terminal]');
  if (term) {
    var lines = [];
    try { lines = JSON.parse(term.getAttribute('data-terminal')); } catch (e) { lines = []; }
    var out = $('.terminal__body', term.closest('.terminal') || term) || term;

    function render(all, partial) {
      out.innerHTML = all.map(function (l) { return '<div class="terminal__line">' + l + '</div>'; }).join('') +
        (partial !== null ? '<div class="terminal__line">' + partial + '<span class="terminal__cursor"></span></div>' : '');
    }

    if (reduced || !lines.length) {
      render(lines, null);
    } else {
      var done = [], li = 0, ci = 0;
      (function type() {
        if (li >= lines.length) { render(done, ''); return; }
        var raw = lines[li];
        // type on the plain text but preserve markup by revealing progressively at tag boundaries
        var plain = raw.replace(/<[^>]+>/g, '');
        ci++;
        var shown = revealMarkup(raw, ci);
        render(done, shown);
        if (ci >= plain.length) { done.push(raw); li++; ci = 0; setTimeout(type, 260); }
        else setTimeout(type, raw.indexOf('$') === 0 || raw.indexOf('&gt;') > -1 ? 16 : 9);
      })();
    }

    function revealMarkup(html, n) {
      var res = '', count = 0, i = 0, openTags = [];
      while (i < html.length && count < n) {
        if (html[i] === '<') {
          var end = html.indexOf('>', i);
          if (end === -1) break;
          var tag = html.substring(i, end + 1);
          res += tag;
          if (tag[1] === '/') openTags.pop();
          else if (tag[tag.length - 2] !== '/') openTags.push(tag.match(/^<\s*([a-zA-Z0-9]+)/)[1]);
          i = end + 1;
        } else { res += html[i]; i++; count++; }
      }
      while (openTags.length) res += '</' + openTags.pop() + '>';
      return res;
    }
  }

  /* ---------- Accordions ---------- */
  $$('.accordion').forEach(function (acc) {
    var single = acc.hasAttribute('data-single');
    $$('.accordion__btn', acc).forEach(function (btn) {
      var item = btn.closest('.accordion__item');
      var panel = $('.accordion__panel', item);
      btn.setAttribute('aria-expanded', item.classList.contains('is-open') ? 'true' : 'false');
      if (item.classList.contains('is-open')) panel.style.maxHeight = panel.scrollHeight + 'px';

      btn.addEventListener('click', function () {
        var open = item.classList.contains('is-open');
        if (single) {
          $$('.accordion__item.is-open', acc).forEach(function (o) {
            o.classList.remove('is-open');
            $('.accordion__panel', o).style.maxHeight = null;
            $('.accordion__btn', o).setAttribute('aria-expanded', 'false');
          });
        }
        if (open) {
          item.classList.remove('is-open'); panel.style.maxHeight = null; btn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('is-open'); panel.style.maxHeight = panel.scrollHeight + 'px'; btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });
  window.addEventListener('resize', function () {
    $$('.accordion__item.is-open .accordion__panel').forEach(function (p) { p.style.maxHeight = p.scrollHeight + 'px'; });
  });

  /* ---------- Tabs ---------- */
  $$('[data-tabs]').forEach(function (root) {
    var btns = $$('.tabs__btn', root), panels = $$('.tabs__panel', root);
    btns.forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        btns.forEach(function (b) { b.setAttribute('aria-selected', 'false'); });
        panels.forEach(function (p) { p.classList.remove('is-active'); });
        btn.setAttribute('aria-selected', 'true');
        if (panels[i]) panels[i].classList.add('is-active');
      });
    });
  });

  /* ---------- Service filters ---------- */
  $$('[data-filters]').forEach(function (root) {
    var targetSel = root.getAttribute('data-filters');
    var cards = $$(targetSel + ' [data-cat]');
    $$('.filter', root).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cat = btn.getAttribute('data-filter');
        $$('.filter', root).forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        cards.forEach(function (card) {
          var show = cat === 'all' || card.getAttribute('data-cat').split(' ').indexOf(cat) > -1;
          card.hidden = !show;
        });
      });
    });
  });

  /* ---------- Card cursor glow ---------- */
  if (!reduced && window.matchMedia('(hover: hover)').matches) {
    $$('.card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* ---------- Hero canvas: node-graph "attack surface" ---------- */
  var canvas = $('#hero-canvas');
  if (canvas && !reduced) {
    var ctx = canvas.getContext('2d');
    var nodes = [], w, h, dpr = Math.min(window.devicePixelRatio || 1, 2), raf;
    var pointer = { x: -9999, y: -9999 };

    function size() {
      var r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.min(Math.round((w * h) / 15000), 110);
      nodes = [];
      for (var i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - .5) * .28, vy: (Math.random() - .5) * .28,
          r: Math.random() * 1.6 + .8,
          hot: Math.random() < .09
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < nodes.length; i++) {
        var a = nodes[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;

        for (var j = i + 1; j < nodes.length; j++) {
          var b = nodes[j];
          var dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
          if (d2 < 21000) {
            var o = (1 - d2 / 21000) * .26;
            ctx.strokeStyle = (a.hot || b.hot) ? 'rgba(225,29,51,' + o + ')' : 'rgba(140,160,190,' + (o * .55) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        // pointer link
        var pdx = a.x - pointer.x, pdy = a.y - pointer.y, pd2 = pdx * pdx + pdy * pdy;
        if (pd2 < 26000) {
          ctx.strokeStyle = 'rgba(34,211,238,' + (1 - pd2 / 26000) * .4 + ')';
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(pointer.x, pointer.y); ctx.stroke();
        }
        ctx.fillStyle = a.hot ? 'rgba(225,29,51,.85)' : 'rgba(170,190,215,.5)';
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
        if (a.hot) {
          ctx.fillStyle = 'rgba(225,29,51,.13)';
          ctx.beginPath(); ctx.arc(a.x, a.y, a.r * 4.5, 0, Math.PI * 2); ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    }

    size(); draw();
    window.addEventListener('resize', function () { cancelAnimationFrame(raf); size(); draw(); });
    canvas.addEventListener('mousemove', function (e) {
      var r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top;
    });
    canvas.addEventListener('mouseleave', function () { pointer.x = pointer.y = -9999; });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) cancelAnimationFrame(raf); else { cancelAnimationFrame(raf); draw(); }
    });
  }

  /* ---------- Newsletter → prefill contact form ---------- */
  window.atSubscribe = function (input) {
    var email = (input && input.value || '').trim();
    var form = $('#contact-form');
    if (form) {
      if (email && form.email) form.email.value = email;
      if (form.subject) form.subject.value = 'Request: threat-intel & newsletter subscription';
      if (form.message) form.message.value = 'Hi Alpha Threat,\n\nPlease add me to your free threat-intelligence feed, security advisories and newsletter.\n\nThanks.';
      location.hash = '#contact';
      setTimeout(function () { if (form.name) form.name.focus(); }, 400);
    }
    return false;
  };

  /* ---------- Copy helpers (PGP key, email) ---------- */
  function copy(text, el) {
    var done = function () {
      if (!el) return;
      var old = el.getAttribute('data-label') || el.textContent;
      el.setAttribute('data-label', old);
      el.textContent = 'Copied ✓';
      setTimeout(function () { el.textContent = old; }, 1900);
    };
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, done);
    else {
      var ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta); done();
    }
  }
  $$('[data-copy]').forEach(function (el) {
    el.addEventListener('click', function () {
      var val = el.getAttribute('data-copy');
      if (val === 'pgp' && typeof window.pgpKey === 'string') copy(window.pgpKey, el);
      else copy(val, el);
    });
  });

  /* ---------- Current year ---------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
