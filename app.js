/* GoShuttle — shared client logic (auth + navigation + home/track) */

document.addEventListener('DOMContentLoaded', () => {
  const toastEl = document.getElementById('toast');

  function showToast(message, duration = 2200) {
    if (!toastEl) {
      // fallback
      console.log('[toast]', message);
      return;
    }
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toastEl.classList.remove('show'), duration);
  }

  function setError(wrapId, errorId, condition) {
    const wrap = document.getElementById(wrapId);
    const err = document.getElementById(errorId);
    if (!wrap || !err) return !!condition;
    if (condition) {
      wrap.classList.remove('error');
      err.classList.remove('show');
      return true;
    }
    wrap.classList.add('error');
    err.classList.add('show');
    return false;
  }

  // ---------- Sign In ----------
  const signInForm = document.getElementById('signInForm');
  if (signInForm) {
    const studentId = document.getElementById('studentId');
    const password = document.getElementById('password');

    signInForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const idOk = setError('studentIdWrap', 'studentIdError', studentId.value.trim().length > 0);
      const pwOk = setError('passwordWrap', 'passwordError', password.value.trim().length > 0);
      if (idOk && pwOk) {
        showToast(`Signing in as ${studentId.value.trim()}…`);
        // Persist a simple session flag for demo
        try {
          sessionStorage.setItem('goshuttle_user', studentId.value.trim());
          sessionStorage.setItem('goshuttle_name', 'Samu');
        } catch (_) {}
        setTimeout(() => { window.location.href = 'home.html'; }, 900);
      }
    });

    [studentId, password].forEach((input) => {
      input?.addEventListener('input', () => {
        setError(input.id + 'Wrap', input.id + 'Error', input.value.trim().length > 0);
      });
    });

    document.getElementById('forgotPassword')?.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Password reset link would be sent to your email.');
    });
    document.getElementById('googleBtn')?.addEventListener('click', () =>
      showToast('Redirecting to Google sign-in…')
    );
    document.getElementById('cputBtn')?.addEventListener('click', () =>
      showToast('Redirecting to CPUT student email sign-in…')
    );
  }

  // ---------- Register ----------
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    const fullName = document.getElementById('fullName');
    const studentNumber = document.getElementById('studentNumber');
    const email = document.getElementById('email');
    const campus = document.getElementById('campus');
    const regPassword = document.getElementById('regPassword');
    const terms = document.getElementById('terms');

    studentNumber?.addEventListener('input', () => {
      const digits = studentNumber.value.trim();
      if (digits && !email.dataset.userEdited) {
        email.value = `${digits}@mycput.ac.za`;
      }
      setError('studentNumberWrap', 'studentNumberError', /^\d{6,10}$/.test(digits));
    });

    email?.addEventListener('input', () => {
      email.dataset.userEdited = 'true';
      setError('emailWrap', 'emailError', /^[\w.+-]+@mycput\.ac\.za$/i.test(email.value.trim()));
    });

    fullName?.addEventListener('input', () => {
      setError('fullNameWrap', 'fullNameError', fullName.value.trim().length > 1);
    });
    campus?.addEventListener('change', () => {
      setError('campusWrap', 'campusError', campus.value !== '');
    });
    regPassword?.addEventListener('input', () => {
      setError('regPasswordWrap', 'regPasswordError', regPassword.value.length >= 8);
    });
    terms?.addEventListener('change', () => {
      document.getElementById('termsError')?.classList.toggle('show', !terms.checked);
    });

    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameOk = setError('fullNameWrap', 'fullNameError', fullName.value.trim().length > 1);
      const numOk = setError('studentNumberWrap', 'studentNumberError', /^\d{6,10}$/.test(studentNumber.value.trim()));
      const emailOk = setError('emailWrap', 'emailError', /^[\w.+-]+@mycput\.ac\.za$/i.test(email.value.trim()));
      const campusOk = setError('campusWrap', 'campusError', campus.value !== '');
      const pwOk = setError('regPasswordWrap', 'regPasswordError', regPassword.value.length >= 8);
      const termsOk = terms.checked;
      document.getElementById('termsError')?.classList.toggle('show', !termsOk);

      if (nameOk && numOk && emailOk && campusOk && pwOk && termsOk) {
        showToast('Account created! Redirecting to sign in…');
        try {
          sessionStorage.setItem('goshuttle_name', fullName.value.trim().split(' ')[0] || 'Samu');
        } catch (_) {}
        setTimeout(() => { window.location.href = 'index.html'; }, 1200);
      }
    });
  }

  // ---------- Home ----------
  const nameEl = document.getElementById('userGreeting');
  if (nameEl) {
    let name = 'Samu';
    try {
      name = sessionStorage.getItem('goshuttle_name') || name;
    } catch (_) {}
    nameEl.textContent = name;
  }

  document.querySelectorAll('.bus-card[data-bus]').forEach((card) => {
    card.addEventListener('click', () => {
      const bus = card.getAttribute('data-bus');
      try {
        sessionStorage.setItem('selectedBus', bus);
      } catch (_) {}
      window.location.href = 'track.html';
    });
  });

  // Live card → track
  document.querySelector('.live-card')?.addEventListener('click', () => {
    try {
      sessionStorage.setItem('selectedBus', 'G1 • Khayelitsha → CPUT Bellville');
    } catch (_) {}
    window.location.href = 'track.html';
  });

  // ---------- Track ----------
  const selectedBus = (() => {
    try { return sessionStorage.getItem('selectedBus'); } catch (_) { return null; }
  })();
  if (selectedBus) {
    const chip = document.getElementById('liveChipText');
    const title = document.getElementById('trackBusTitle');
    if (chip) chip.textContent = selectedBus.includes('G1') || selectedBus.includes('GS-112')
      ? 'G1 • Live'
      : selectedBus.split('•')[0].trim() + ' • Live';
    if (title && selectedBus.includes('GS-112') === false && selectedBus.includes('G1')) {
      // keep default title for G1
    }
    try { sessionStorage.removeItem('selectedBus'); } catch (_) {}
  }

  document.querySelector('.track-header .back')?.addEventListener('click', () => {
    window.location.href = 'home.html';
  });
  document.querySelector('.track-header .locate')?.addEventListener('click', () => {
    showToast('Centering map on your location…');
  });

  // ---------- Bottom navigation (all app pages) ----------
  document.querySelectorAll('.nav-item[data-nav]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-nav');
      if (target === 'home') window.location.href = 'home.html';
      else if (target === 'track') window.location.href = 'track.html';
      else if (target === 'schedule') showToast('Schedule page coming soon.');
      else if (target === 'pass') showToast('Pass page coming soon.');
    });
  });

  // Header icons on home
  document.getElementById('notifBtn')?.addEventListener('click', () => {
    showToast('You have 2 new notifications.');
  });
  document.getElementById('profileBtn')?.addEventListener('click', () => {
    showToast('Profile & settings coming soon.');
  });
});
