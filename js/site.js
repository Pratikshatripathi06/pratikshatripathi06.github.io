// ============================================================
// Shared page behaviour — replaces the per-page DCLogic scripts
// from the .dc.html handoff (reading-progress bar, Transket's
// scroll-spy table of contents, and the Home contact form).
// Every block below feature-detects its own markup, so this one
// file is safe to include on every page unchanged.
// ============================================================

(function () {
  'use strict';

  // ---------- Reading progress bar ----------
  var bar = document.getElementById('reading-progress');
  if (bar) {
    var updateProgress = function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var pct = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
      bar.style.width = pct + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();
  }

  // ---------- Transket "Explore this case study" active TOC ----------
  // Mirrors the original: the last section whose top has scrolled past
  // (scrollY + 140) gets the active color; everything else resets.
  var tocLinks = document.querySelectorAll('[data-toc-id]');
  if (tocLinks.length) {
    var tocIds = Array.prototype.map.call(tocLinks, function (el) { return el.getAttribute('data-toc-id'); });
    var updateToc = function () {
      var y = window.scrollY + 140;
      var active = '';
      tocIds.forEach(function (id) {
        var el = document.getElementById(id);
        if (el && el.offsetTop <= y) active = id;
      });
      tocLinks.forEach(function (link) {
        var isActive = link.getAttribute('data-toc-id') === active;
        var num = link.querySelector('.toc-num');
        var label = link.querySelector('.toc-label');
        if (num) num.style.color = isActive ? '#E14F8E' : '#B5984E';
        if (label) label.style.color = isActive ? '#1A1411' : '#6E6E73';
      });
    };
    window.addEventListener('scroll', updateToc, { passive: true });
    window.addEventListener('resize', updateToc);
    updateToc();
  }

  // ---------- Home contact form ----------
  var contactForm = document.querySelector('form[aria-label="Send a message"]');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.textContent = "Thanks — I'll get back to you soon!";
    });
  }
})();
