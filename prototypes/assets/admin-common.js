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

/* Editable status-pill pattern: click a pill to reveal a dropdown of
   alternate statuses. A pill declares its current value via data-status;
   its dropdown declares the full vocabulary via data-statuses="a,b,c".
   Color is assigned by cycling a shared palette (see .pill-palette-N in
   admin-common.css) based on each status's position in that list, so no
   page has to hardcode a color per status name. */
const PILL_PALETTE_SIZE = 8;

function paletteIndexForStatus(dropdown, status) {
  const statuses = dropdown.dataset.statuses ? dropdown.dataset.statuses.split(',') : [];
  const idx = statuses.indexOf(status);
  return idx === -1 ? 0 : idx % PILL_PALETTE_SIZE;
}

function applyPillColor(pill) {
  const dropdown = pill.querySelector('.status-dropdown');
  if (!dropdown) return;
  for (let i = 0; i < PILL_PALETTE_SIZE; i++) pill.classList.remove('pill-palette-' + i);
  pill.classList.add('pill-palette-' + paletteIndexForStatus(dropdown, pill.dataset.status));
}

function initStatusPills() {
  document.querySelectorAll('.status-pill.editable[data-status]').forEach(applyPillColor);
}

function toggleStatusDropdown(event) {
  // A click on an option bubbles through the pill (its ancestor) on the
  // way up to the document-level handler that applies the selection.
  // Don't let the pill's own handler intercept/stop that here.
  if (event.target.closest('.status-option')) return;

  event.stopPropagation();
  const pill = event.currentTarget;
  const row = pill.closest('tr');
  const dropdown = pill.querySelector('.status-dropdown');

  document.querySelectorAll('.status-dropdown').forEach(dd => {
    if (dd !== dropdown) {
      dd.classList.remove('show');
      const ddRow = dd.closest('tr');
      if (ddRow) ddRow.classList.remove('dropdown-active');
    }
  });

  const isOpening = !dropdown.classList.contains('show');

  if (isOpening) {
    // Skip showing whichever option is already the pill's active status.
    dropdown.querySelectorAll('.status-option').forEach(opt => {
      opt.style.display = opt.dataset.status === pill.dataset.status ? 'none' : '';
    });
  }

  dropdown.classList.toggle('show');
  if (row) row.classList.toggle('dropdown-active', isOpening);
}

function selectStatus(optionEl) {
  const pill = optionEl.closest('.status-pill');
  const row = pill.closest('tr');
  const dropdown = pill.querySelector('.status-dropdown');

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
