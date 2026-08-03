// GoShuttle — home.html logic
// Matches auth-screen patterns (toast) and navigates to track.html

document.addEventListener('DOMContentLoaded', () => {
  const toastEl = document.getElementById('toast');

  function showToast(message, duration = 2200) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toastEl.classList.remove('show'), duration);
  }

  // Bus item → live track
  document.querySelectorAll('.bus-item').forEach(item => {
    item.addEventListener('click', () => {
      const busName = item.querySelector('h4')?.textContent?.trim() || 'Bus';
      sessionStorage.setItem('selectedBus', busName);
      showToast(`Opening live track for ${busName}…`);
      setTimeout(() => {
        window.location.href = 'track.html';
      }, 500);
    });
  });

  // Bottom navigation
  document.querySelector('.nav-home')?.addEventListener('click', () => {
    // Already on home
  });

  document.querySelector('.nav-track')?.addEventListener('click', () => {
    window.location.href = 'track.html';
  });

  document.querySelector('.nav-schedule')?.addEventListener('click', () => {
    showToast('Schedule page coming soon.');
  });

  document.querySelector('.nav-pass')?.addEventListener('click', () => {
    showToast('Pass page coming soon.');
  });
});
