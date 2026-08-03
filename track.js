// GoShuttle — track.html logic
// Back button, selected-bus header, bottom nav (matches home.js patterns)

document.addEventListener('DOMContentLoaded', () => {
  const toastEl = document.getElementById('toast');

  function showToast(message, duration = 2200) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toastEl.classList.remove('show'), duration);
  }

  // Back → home
  document.querySelector('.back')?.addEventListener('click', () => {
    window.location.href = 'home.html';
  });

  // Reflect bus selected from home.html
  const selectedBus = sessionStorage.getItem('selectedBus');
  if (selectedBus) {
    const heading = document.getElementById('busHeading');
    if (heading) heading.textContent = selectedBus;
    sessionStorage.removeItem('selectedBus');
  }

  // Bottom navigation
  document.querySelector('.nav-home')?.addEventListener('click', () => {
    window.location.href = 'home.html';
  });

  document.querySelector('.nav-track')?.addEventListener('click', () => {
    // Already on track
  });

  document.querySelector('.nav-schedule')?.addEventListener('click', () => {
    showToast('Schedule page coming soon.');
  });

  document.querySelector('.nav-pass')?.addEventListener('click', () => {
    showToast('Pass page coming soon.');
  });
});
