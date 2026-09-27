/* ==========================================================================
   KadaKareer Admin — shared behaviors
   Used by: admin-signups-coach.html, admin-signups-program.html,
            admin-submissions.html
   ========================================================================== */

// Generic modal open/close. Pass the modal element's id.
function openModal(id) {
  document.getElementById(id).classList.add('show');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('show');
}

// Click the backdrop (the .modal itself, not its .modal-content) or press
// Escape to close whichever modal is open.
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal') && e.target.classList.contains('show')) {
    e.target.classList.remove('show');
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key !== 'Escape') return;
  document.querySelectorAll('.modal.show').forEach(modal => modal.classList.remove('show'));
});

// A dropdown positioned via CSS (absolute, anchored to its pill) only
// paints above sibling rows if the row's own z-index stacking wins —
// which real <table> rows don't do reliably. The actual fix isn't a
// bigger z-index, it's not being inside the table's stacking at all:
// every dropdown gets moved to a direct child of <body> once, up front,
// and repositioned via getBoundingClientRect() each time it opens. Once
// it's not a descendant of any <tr>, no row can ever paint over it,
// full stop — this is also why the pill<->dropdown link can't rely on
// DOM nesting anymore (relocatePillDropdown wires up ._dropdownEl /
// ._ownerPill instead).
function relocatePillDropdown(pill, dropdownSelector) {
  const dropdown = pill.querySelector(dropdownSelector);
  if (!dropdown) return;
  if (dropdown.dataset.statuses) pill.dataset.statuses = dropdown.dataset.statuses;
  pill._dropdownEl = dropdown;
  dropdown._ownerPill = pill;
  document.body.appendChild(dropdown);
}

function positionDropdownFixed(anchor, dropdown) {
  const rect = anchor.getBoundingClientRect();
  dropdown.style.position = 'fixed';
  dropdown.style.top = (rect.bottom + 4) + 'px';
  dropdown.style.left = rect.left + 'px';
  dropdown.style.margin = '0';
}

function closeAllStatusDropdowns() {
  document.querySelectorAll('.status-dropdown.show').forEach(dd => {
    dd.classList.remove('show');
    const row = dd._ownerPill ? dd._ownerPill.closest('tr') : null;
    if (row) row.classList.remove('dropdown-active');
  });
}

// Capture phase so this still fires for a scroll inside a nested
// scrollable container (like the table's own scroll region) — a
// fixed-position dropdown doesn't scroll with its anchor, so it has to
// close rather than drift away from the pill that opened it.
document.addEventListener('scroll', closeAllStatusDropdowns, true);
window.addEventListener('resize', closeAllStatusDropdowns);

/* Editable status-pill pattern: click a pill to reveal a dropdown of
   alternate statuses. A pill declares its current value via data-status;
   its dropdown declares the full vocabulary via data-statuses="a,b,c"
   (mirrored onto the pill itself by relocatePillDropdown, since the
   dropdown is no longer guaranteed to be a descendant). Color is
   assigned by cycling a shared palette (see .pill-palette-N in
   admin-common.css) based on each status's position in that list, so no
   page has to hardcode a color per status name. */
const PILL_PALETTE_SIZE = 8;

function paletteIndexForStatus(pill, status) {
  const statuses = pill.dataset.statuses ? pill.dataset.statuses.split(',') : [];
  const idx = statuses.indexOf(status);
  return idx === -1 ? 0 : idx % PILL_PALETTE_SIZE;
}

function applyPillColor(pill) {
  for (let i = 0; i < PILL_PALETTE_SIZE; i++) pill.classList.remove('pill-palette-' + i);
  pill.classList.add('pill-palette-' + paletteIndexForStatus(pill, pill.dataset.status));
}

function initStatusPills() {
  document.querySelectorAll('.status-pill.editable[data-status]').forEach(pill => {
    relocatePillDropdown(pill, '.status-dropdown');
    applyPillColor(pill);
  });
}

function toggleStatusDropdown(event) {
  // A click on an option bubbles through the pill (its ancestor) on the
  // way up to the document-level handler that applies the selection.
  // Don't let the pill's own handler intercept/stop that here.
  if (event.target.closest('.status-option')) return;

  event.stopPropagation();
  const pill = event.currentTarget;
  const row = pill.closest('tr');
  const dropdown = pill._dropdownEl;
  if (!dropdown) return;

  document.querySelectorAll('.status-dropdown').forEach(dd => {
    if (dd !== dropdown) {
      dd.classList.remove('show');
      const ddRow = dd._ownerPill ? dd._ownerPill.closest('tr') : null;
      if (ddRow) ddRow.classList.remove('dropdown-active');
    }
  });

  const isOpening = !dropdown.classList.contains('show');

  if (isOpening) {
    // Skip showing whichever option is already the pill's active status.
    dropdown.querySelectorAll('.status-option').forEach(opt => {
      opt.style.display = opt.dataset.status === pill.dataset.status ? 'none' : '';
    });
    positionDropdownFixed(pill, dropdown);
  }

  dropdown.classList.toggle('show');
  if (row) row.classList.toggle('dropdown-active', isOpening);
}

function selectStatus(optionEl) {
  const dropdown = optionEl.closest('.status-dropdown');
  const pill = dropdown ? dropdown._ownerPill : null;
  if (!pill) return;
  const row = pill.closest('tr');

  pill.dataset.status = optionEl.dataset.status;
  applyPillColor(pill);

  const label = pill.querySelector('.status-pill-label');
  if (label) label.textContent = optionEl.textContent.trim();

  dropdown.classList.remove('show');
  if (row) row.classList.remove('dropdown-active');
}

document.addEventListener('click', function(e) {
  const option = e.target.closest('.status-option');
  if (option) {
    e.stopPropagation();
    selectStatus(option);
    return;
  }

  document.querySelectorAll('.status-dropdown.show').forEach(dd => {
    dd.classList.remove('show');
  });
  document.querySelectorAll('tr.dropdown-active').forEach(row => {
    row.classList.remove('dropdown-active');
  });
});

// Runs immediately: this script is always loaded after the page's own
// markup, so every .status-pill is already in the DOM by this point.
initStatusPills();
