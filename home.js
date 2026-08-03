// GoShuttle — home.html logic
document.addEventListener('DOMContentLoaded', () => {
  const toastEl = document.getElementById('toast');

  function showToast(message, duration = 2200) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toastEl.classList.remove('show'), duration);
  }

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

  document.querySelector('.nav-home')?.addEventListener('click', () => {});
  document.querySelector('.nav-track')?.addEventListener('click', () => {
    window.location.href = 'track.html';
  });
  document.querySelector('.nav-schedule')?.addEventListener('click', () => {
    window.location.href = 'schedule.html';
  });
  document.querySelector('.nav-pass')?.addEventListener('click', () => {
    window.location.href = 'pass.html';
  });
});
