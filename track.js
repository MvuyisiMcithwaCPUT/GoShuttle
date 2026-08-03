// GoShuttle — track.html logic
document.addEventListener('DOMContentLoaded', () => {
  const toastEl = document.getElementById('toast');

  function showToast(message, duration = 2200) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toastEl.classList.remove('show'), duration);
  }

  document.querySelector('.back')?.addEventListener('click', () => {
    window.location.href = 'home.html';
  });

  const selectedBus = sessionStorage.getItem('selectedBus');
  if (selectedBus) {
    const heading = document.getElementById('busHeading');
    if (heading) heading.textContent = selectedBus;
    sessionStorage.removeItem('selectedBus');
  }

  document.querySelector('.nav-home')?.addEventListener('click', () => {
    window.location.href = 'home.html';
  });
  document.querySelector('.nav-track')?.addEventListener('click', () => {});
  document.querySelector('.nav-schedule')?.addEventListener('click', () => {
    window.location.href = 'schedule.html';
  });
  document.querySelector('.nav-pass')?.addEventListener('click', () => {
    window.location.href = 'pass.html';
  });
});
