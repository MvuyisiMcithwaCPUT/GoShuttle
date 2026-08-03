// GoShuttle — shared auth logic for index.html (Sign In) and register.html (Create Account)

document.addEventListener('DOMContentLoaded', () => {
  const toastEl = document.getElementById('toast');

  function showToast(message, duration = 2200) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toastEl.classList.remove('show'), duration);
  }

  function setError(wrapId, errorId, condition) {
    const wrap = document.getElementById(wrapId);
    const err = document.getElementById(errorId);
    if (!wrap || !err) return !condition;
    if (condition) {
      wrap.classList.remove('error');
      err.classList.remove('show');
      return true;
    } else {
      wrap.classList.add('error');
      err.classList.add('show');
      return false;
    }
  }

  // ---------- Sign In page ----------
  const signInForm = document.getElementById('signInForm');
  if (signInForm) {
    const studentId = document.getElementById('studentId');
    const password = document.getElementById('password');
    const forgotPassword = document.getElementById('forgotPassword');
    const googleBtn = document.getElementById('googleBtn');
    const cputBtn = document.getElementById('cputBtn');

    signInForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const idOk = setError('studentIdWrap', 'studentIdError', studentId.value.trim().length > 0);
      const pwOk = setError('passwordWrap', 'passwordError', password.value.trim().length > 0);

      if (idOk && pwOk) {
        showToast(`Signing in as ${studentId.value.trim()}…`);
        // Hook up to a real auth endpoint here, e.g.:
        // fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ id: studentId.value, password: password.value }) })
        signInForm.reset();
        setTimeout(() => { window.location.href = 'home.html'; }, 900);
      }
    });

    [studentId, password].forEach((input) => {
      input.addEventListener('input', () => {
        setError(input.id + 'Wrap', input.id + 'Error', input.value.trim().length > 0);
      });
    });

    forgotPassword?.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Password reset link would be sent to your email.');
    });

    googleBtn?.addEventListener('click', () => showToast('Redirecting to Google sign-in…'));
    cputBtn?.addEventListener('click', () => showToast('Redirecting to CPUT student email sign-in…'));
  }

  // ---------- Create Account page ----------
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    const fullName = document.getElementById('fullName');
    const studentNumber = document.getElementById('studentNumber');
    const email = document.getElementById('email');
    const campus = document.getElementById('campus');
    const regPassword = document.getElementById('regPassword');
    const terms = document.getElementById('terms');

    // Auto-suggest the CPUT email as the student number is typed
    studentNumber.addEventListener('input', () => {
      const digits = studentNumber.value.trim();
      if (digits && !email.dataset.userEdited) {
        email.value = `${digits}@mycput.ac.za`;
      }
      setError('studentNumberWrap', 'studentNumberError', /^\d{6,10}$/.test(digits));
    });

    email.addEventListener('input', () => {
      email.dataset.userEdited = 'true';
      setError('emailWrap', 'emailError', /^[\w.+-]+@mycput\.ac\.za$/i.test(email.value.trim()));
    });

    fullName.addEventListener('input', () => {
      setError('fullNameWrap', 'fullNameError', fullName.value.trim().length > 1);
    });

    campus.addEventListener('change', () => {
      setError('campusWrap', 'campusError', campus.value !== '');
    });

    regPassword.addEventListener('input', () => {
      setError('regPasswordWrap', 'regPasswordError', regPassword.value.length >= 8);
    });

    terms.addEventListener('change', () => {
      const errEl = document.getElementById('termsError');
      errEl.classList.toggle('show', !terms.checked);
    });

    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameOk = setError('fullNameWrap', 'fullNameError', fullName.value.trim().length > 1);
      const numOk = setError('studentNumberWrap', 'studentNumberError', /^\d{6,10}$/.test(studentNumber.value.trim()));
      const emailOk = setError('emailWrap', 'emailError', /^[\w.+-]+@mycput\.ac\.za$/i.test(email.value.trim()));
      const campusOk = setError('campusWrap', 'campusError', campus.value !== '');
      const pwOk = setError('regPasswordWrap', 'regPasswordError', regPassword.value.length >= 8);

      const termsErrEl = document.getElementById('termsError');
      const termsOk = terms.checked;
      termsErrEl.classList.toggle('show', !termsOk);

      if (nameOk && numOk && emailOk && campusOk && pwOk && termsOk) {
        showToast('Account created! Redirecting to sign in…');
        // Hook up to a real registration endpoint here, e.g.:
        // fetch('/api/auth/register', { method: 'POST', body: JSON.stringify({...}) })
        setTimeout(() => { window.location.href = 'index.html'; }, 1200);
      }
    });
  }
});
