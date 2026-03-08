//  script.js — Student Registration Validation
// 1. Grab all elements from the DOM 

const nameInput     = document.getElementById('name');
const emailInput    = document.getElementById('email');
const passwordInput = document.getElementById('password');

const nameError     = document.getElementById('nameError');
const emailError    = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

const submitBtn     = document.getElementById('submitBtn');
const togglePass    = document.getElementById('togglePass');
const strengthFill  = document.getElementById('strengthFill');

// 2. Validation Functions

function validateName() {
  const val = nameInput.value.trim();
  const wrap = nameInput.closest('.input-wrap');

  if (val === '') {
    showError(wrap, nameError, '⚠ Name cannot be empty.');
    return false;
  }
  clearError(wrap, nameError);
  return true;
}

function validateEmail() {
  const val = emailInput.value.trim();
  const wrap = emailInput.closest('.input-wrap');

  // Regex: must have something @ something . something
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(val)) {
    showError(wrap, emailError, '⚠ Enter a valid email address.');
    return false;
  }
  clearError(wrap, emailError);
  return true;
}

function validatePassword() {
  const val = passwordInput.value;
  const wrap = passwordInput.closest('.input-wrap');

  // Update strength bar
  updateStrength(val);

  if (val.length < 6) {
    showError(wrap, passwordError,
      `⚠ Password too short — ${val.length} / 6 characters.`);
    return false;
  }
  clearError(wrap, passwordError);
  return true;
}

// 3. Show / Clear Errors 

function showError(wrap, errorEl, message) {
  errorEl.textContent = message;
  wrap.classList.remove('valid-wrap');
  wrap.classList.add('invalid-wrap');
}

function clearError(wrap, errorEl) {
  errorEl.textContent = '';
  wrap.classList.remove('invalid-wrap');
  wrap.classList.add('valid-wrap');
}

// 4. Password Strength Bar

function updateStrength(val) {
  const len = val.length;
  let width = '0%';
  let color = 'transparent';

  if (len === 0)       { width = '0%';   color = 'transparent'; }
  else if (len < 4)    { width = '25%';  color = '#ff6b6b'; }
  else if (len < 6)    { width = '50%';  color = '#fd820e'; }
  else if (len < 10)   { width = '75%';  color = '#f0d060'; }
  else                 { width = '100%'; color = '#4cde9a'; }

  strengthFill.style.width      = width;
  strengthFill.style.background = color;
}

// 5. Toggle Password Visibility

togglePass.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  togglePass.textContent = isPassword ? '🙈' : '👁';
});

//  6. Enable / Disable Submit Button 

function checkAllFields() {
  const allValid =
    nameInput.closest('.input-wrap').classList.contains('valid-wrap') &&
    emailInput.closest('.input-wrap').classList.contains('valid-wrap') &&
    passwordInput.closest('.input-wrap').classList.contains('valid-wrap');

  submitBtn.disabled = !allValid;
}

// 7. Event Listeners

nameInput.addEventListener('input', () => {
  validateName();
  checkAllFields();
});

emailInput.addEventListener('input', () => {
  validateEmail();
  checkAllFields();
});

passwordInput.addEventListener('input', () => {
  validatePassword();
  checkAllFields();
});

// 8. Form Submit

document.getElementById('regForm').addEventListener('submit', (e) => {
  e.preventDefault(); // Stop page from refreshing

  // Final safety check before submitting
  if (validateName() && validateEmail() && validatePassword()) {
    alert('🎉 Registration Successful! Welcome!');
    e.target.reset();

    // Reset all UI state
    document.querySelectorAll('.input-wrap').forEach(w => {
      w.classList.remove('valid-wrap', 'invalid-wrap');
    });
    strengthFill.style.width = '0%';
    submitBtn.disabled = true;
  }
});
