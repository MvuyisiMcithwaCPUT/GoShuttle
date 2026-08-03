// GoShuttle — track.html logic
// Merges the original back-button behavior with navigation to/from home.html.

document.querySelector('.back').addEventListener('click', () => {
  window.location.href = 'home.html';
});

// If a bus was selected from home.html, reflect it in the header
const selectedBus = sessionStorage.getItem('selectedBus');
if (selectedBus) {
  const heading = document.querySelector('.map-header h2');
  if (heading) heading.textContent = selectedBus;
  sessionStorage.removeItem('selectedBus');
}

// Bottom navigation
document.querySelector('.nav-home')?.addEventListener('click', () => {
  window.location.href = 'home.html';
});

document.querySelector('.nav-track')?.addEventListener('click', () => {
  window.location.href = 'track.html';
});

document.querySelector('.nav-schedule')?.addEventListener('click', () => {
  alert('Schedule page coming soon.');
});

document.querySelector('.nav-pass')?.addEventListener('click', () => {
  alert('Pass page coming soon.');
});
