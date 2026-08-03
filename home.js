// GoShuttle — home.html logic
// Merges the original click-to-alert behavior with navigation to the live tracking page.

document.querySelectorAll('.bus-item').forEach(item => {
  item.addEventListener('click', () => {
    const busName = item.querySelector('h4').textContent;
    alert(`Tracking ${busName}`);
    // Remember which bus was selected so track.html can show its details
    sessionStorage.setItem('selectedBus', busName);
    window.location.href = 'track.html';
  });
});

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
