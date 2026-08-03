// GoShuttle — Pass page
document.addEventListener('DOMContentLoaded', () => {
  initStatCounters();
  initCopyStudentId();
  initStepChecklist();
  initBottomNav();
});

function showToast(message, duration = 1800) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('show'), duration);
}

function initStatCounters() {
  const values = document.querySelectorAll('.stat-value[data-target]');
  const duration = 900;

  values.forEach((el) => {
    const target = parseInt(el.dataset.target, 10);
    const prefix = el.dataset.prefix || '';
    if (Number.isNaN(target)) return;

    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      el.textContent = `${prefix}${current}`;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = `${prefix}${target}`;
      }
    };
    requestAnimationFrame(tick);
  });
}

function initCopyStudentId() {
  const trigger = document.getElementById('copyId');
  const valueEl = document.getElementById('studentIdValue');
  if (!trigger || !valueEl) return;

  const copyId = async () => {
    const id = valueEl.textContent.trim();
    try {
      await navigator.clipboard.writeText(id);
      showToast('Student ID copied');
    } catch {
      showToast('Could not copy — long-press to select');
    }
  };

  trigger.addEventListener('click', copyId);
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      copyId();
    }
  });
}

function initStepChecklist() {
  document.querySelectorAll('.step-card').forEach((card) => {
    const numberEl = card.querySelector('.step-num');
    if (!numberEl) return;
    const originalNumber = numberEl.textContent;

    card.setAttribute('role', 'checkbox');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-checked', 'false');

    const toggle = () => {
      const completed = card.classList.toggle('completed');
      numberEl.textContent = completed ? '✓' : originalNumber;
      card.setAttribute('aria-checked', String(completed));
    };

    card.addEventListener('click', toggle);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
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
    window.location.href = 'schedule.html';
  });
  document.querySelector('.nav-pass')?.addEventListener('click', () => {
    // already here
  });
}
