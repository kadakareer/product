/* ==========================================================================
   Site navigation bar — one script, every page.
   Adds a breadcrumb (Product › Tickets › Epic › Page), a Back button when you
   arrived from another page on this site, and optional "Related" links.

   Add to a page, just before </body>:
     <script src="../assets/site-nav.js"
             data-label="Program Sign-ups"
             data-related="Label|relative/href;Label|relative/href"></script>
   Adjust the src depth to the page. data-label is the current page's name;
   data-related is optional. The trail comes from the page's folder, so
   nothing else needs to change when a page is added. Not for the home page.
   ========================================================================== */
(function () {
  var me = document.currentScript;
  if (!me || document.querySelector('.site-nav')) return;

  // Site root = one level above this script's folder. Works under file://,
  // GitHub Pages, and preview/<branch>/ copies, because nothing is absolute.
  var root = new URL('../', me.src);
  var rel = decodeURIComponent(location.pathname.slice(root.pathname.length));
  if (!rel || rel.slice(-1) === '/') rel += 'index.html';
  var parts = rel.split('/');

  // Epic folders whose name isn't just the title-cased slug.
  var EPIC_NAMES = { 'virapp-admin': 'VirApp Admin', 'whats-new-banner': "What's New Banner" };
  function titleCase(slug) {
    if (EPIC_NAMES[slug]) return EPIC_NAMES[slug];
    return slug.split('-').map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join(' ');
  }
  function abs(path) { return new URL(path, root).href; }

  var label = me.dataset.label || document.title;
  var trail = [{ label: 'Product', href: abs('index.html') }];

  if (parts[0] === 'tickets') {
    if (parts.length === 2) {
      trail.push({ label: 'Tickets' });
    } else {
      trail.push({ label: 'Tickets', href: abs('tickets/index.html') });
      trail.push({ label: titleCase(parts[1]), href: abs('tickets/index.html') + '#' + parts[1] });
      trail.push({ label: label });
    }
  } else if (parts[0] === 'prototypes') {
    trail.push({ label: 'Prototypes', href: abs('index.html') + '#prototypes' });
    trail.push({ label: label });
  } else {
    trail.push({ label: label });
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }
  function link(text, href) {
    var a = el('a', null, text);
    a.href = href;
    return a;
  }

  var style = el('style');
  style.textContent =
    '.site-nav{display:flex;flex-wrap:wrap;align-items:center;gap:6px 14px;margin:0 0 16px;padding:8px 16px;' +
    'background:#fff;border-bottom:1px solid #d2d2d7;font:13px/1.4 system-ui,-apple-system,sans-serif;color:#6e6e73}' +
    '.site-nav a{color:#0066cc;text-decoration:none}.site-nav a:hover{text-decoration:underline}' +
    '.site-nav .sn-back{border:0;background:none;padding:0;font:inherit;color:#0066cc;cursor:pointer}' +
    '.site-nav .sn-back:hover{text-decoration:underline}' +
    '.site-nav .sn-trail{display:flex;flex-wrap:wrap;align-items:center;gap:4px;margin:0;padding:0;list-style:none}' +
    '.site-nav .sn-trail li+li::before{content:"\\203A";margin-right:4px;color:#9c9a94}' +
    '.site-nav [aria-current]{color:#1d1d1f;font-weight:600}' +
    '.site-nav .sn-related{margin-left:auto;display:flex;flex-wrap:wrap;align-items:center;gap:4px 12px}' +
    '@media print{.site-nav{display:none}}';
  document.head.appendChild(style);

  var nav = el('nav', 'site-nav');
  nav.setAttribute('aria-label', 'Site navigation');

  // Only offer Back when the previous page was on this site; otherwise the
  // browser's own back would leave it.
  var cameFromSite = false;
  try { cameFromSite = !!document.referrer && new URL(document.referrer).origin === location.origin && history.length > 1; } catch (e) {}
  if (cameFromSite) {
    var back = el('button', 'sn-back', '← Back');
    back.type = 'button';
    back.addEventListener('click', function () { history.back(); });
    nav.appendChild(back);
  }

  var ol = el('ol', 'sn-trail');
  trail.forEach(function (t, i) {
    var li = el('li');
    if (t.href && i < trail.length - 1) li.appendChild(link(t.label, t.href));
    else { li.textContent = t.label; if (i === trail.length - 1) li.setAttribute('aria-current', 'page'); }
    ol.appendChild(li);
  });
  nav.appendChild(ol);

  var items = (me.dataset.related || '').split(';').filter(Boolean);
  if (items.length) {
    var relBox = el('div', 'sn-related');
    relBox.appendChild(el('span', null, 'Related:'));
    items.forEach(function (s) {
      var bits = s.split('|');
      if (bits.length === 2) relBox.appendChild(link(bits[0].trim(), new URL(bits[1].trim(), location.href).href));
    });
    nav.appendChild(relBox);
  }

  document.body.insertBefore(nav, document.body.firstChild);
})();
