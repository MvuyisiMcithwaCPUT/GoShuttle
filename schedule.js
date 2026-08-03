// GoShuttle — Schedule (Stops & Routes)
document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initSearch();
  initCollapsibleCards();
  initStopSelection();
  initBottomNav();
});

function showToast(message, duration = 2200) {
  const toastEl = document.getElementById('toast');
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toastEl.classList.remove('show'), duration);
}

function initClock() {
  const clock = document.getElementById('statusTime');
  if (!clock) return;
  const update = () => {
    const now = new Date();
    clock.textContent = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  };
  update();
  setInterval(update, 15000);
}

function initSearch() {
  const input = document.getElementById('searchInput');
  const emptyState = document.getElementById('emptyState');
  const routeCards = Array.from(document.querySelectorAll('.route-card'));
  if (!input) return;

  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    let anyCardVisible = false;

    routeCards.forEach((card) => {
      const titleEl = card.querySelector('.route-title');
      const titleMatches = query === '' || (titleEl && titleEl.textContent.toLowerCase().includes(query));
      const stops = Array.from(card.querySelectorAll('.stop-item'));

      let anyStopVisible = false;
      stops.forEach((stop) => {
        const stopMatches = titleMatches || stop.textContent.toLowerCase().includes(query);
        stop.classList.toggle('hidden', !stopMatches);
        if (stopMatches) anyStopVisible = true;
      });

      const cardVisible = titleMatches || anyStopVisible;
      card.classList.toggle('hidden', !cardVisible);
      if (cardVisible) anyCardVisible = true;
    });

    if (emptyState) {
      emptyState.classList.toggle('visible', !anyCardVisible);
    }
  });
}

function initCollapsibleCards() {
  document.querySelectorAll('.route-header').forEach((header) => {
    header.setAttribute('role', 'button');
    header.setAttribute('tabindex', '0');
    header.setAttribute('aria-expanded', 'true');

    const toggle = () => {
      const card = header.closest('.route-card');
      if (!card) return;
      const collapsed = card.classList.toggle('collapsed');
      header.setAttribute('aria-expanded', String(!collapsed));
    };

    header.addEventListener('click', toggle);
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
}

function initStopSelection() {
  document.querySelectorAll('.stop-item').forEach((stop) => {
    stop.addEventListener('click', () => {
      stop.classList.toggle('selected');
    });
  });
}

function initBottomNav() {
  document.querySelector('.nav-home')?.addEventListener('click', () => {
    window.location.href = 'home.html';
  });
  document.querySelector('.nav-track')?.addEventListener('click', () => {
    window.location.href = 'track.html';
  });
  document.querySelector('.nav-schedule')?.addEventListener('click', () => {
    // already here
  });
  document.querySelector('.nav-pass')?.addEventListener('click', () => {
    window.location.href = 'pass.html';
  });
}
