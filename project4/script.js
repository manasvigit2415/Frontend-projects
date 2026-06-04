/* ═══════════════════════════════════════════════
   WildTrek — script.js
   Form Design & Validation · Project 4
   All validation logic: regex, cross-field,
   real-time blur, ARIA tethering, strength meter
═══════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────
   1. ELEMENT REFERENCES
───────────────────────────────────────────── */
const form          = document.getElementById('booking-form');
const successBanner = document.getElementById('success-banner');

const fields = {
  fullname:        document.getElementById('fullname'),
  email:           document.getElementById('email'),
  phone:           document.getElementById('phone'),
  travelDate:      document.getElementById('travel-date'),
  destination:     document.getElementById('destination'),
  travellers:      document.getElementById('travellers'),
  password:        document.getElementById('password'),
  confirmPassword: document.getElementById('confirm-password'),
  message:         document.getElementById('message'),
  terms:           document.getElementById('terms'),
};

/* ─────────────────────────────────────────────
   2. REGEX PATTERNS  (The Regex Inspector)
───────────────────────────────────────────── */
const PATTERNS = {
  fullname: /^[A-Za-z\s'-]{2,60}$/,
  email:    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  phone:    /^[6-9]\d{9}$/,
  // Strict password: uppercase + lowercase + digit + special char + min 8
  password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#!@$%^&*\-]).{8,}$/,
};

/* ─────────────────────────────────────────────
   3. ARIA HELPER FUNCTIONS  (The Communicator)
   showError  — injects message, sets aria-invalid
   showSuccess — clears message, sets aria-invalid
   clearState  — resets a field to neutral
───────────────────────────────────────────── */
function showError(inputEl, message) {
  const errorSpan = document.getElementById(inputEl.id + '-error');
  if (!errorSpan) return;

  inputEl.classList.add('is-error');
  inputEl.classList.remove('is-success');
  inputEl.setAttribute('aria-invalid', 'true');
  errorSpan.textContent = message;
}

function showSuccess(inputEl) {
  const errorSpan = document.getElementById(inputEl.id + '-error');
  if (!errorSpan) return;

  inputEl.classList.remove('is-error');
  inputEl.classList.add('is-success');
  inputEl.setAttribute('aria-invalid', 'false');
  errorSpan.textContent = '';
}

function clearState(inputEl) {
  const errorSpan = document.getElementById(inputEl.id + '-error');
  inputEl.classList.remove('is-error', 'is-success');
  inputEl.setAttribute('aria-invalid', 'false');
  if (errorSpan) errorSpan.textContent = '';
}

/* ─────────────────────────────────────────────
   4. INDIVIDUAL FIELD VALIDATORS
   Each returns true if valid, false if not.
───────────────────────────────────────────── */

function validateFullname() {
  const v = fields.fullname.value.trim();
  if (v === '') {
    showError(fields.fullname, 'Full name is required.');
    return false;
  }
  if (!PATTERNS.fullname.test(v)) {
    showError(fields.fullname, 'Name must be 2–60 characters, letters only.');
    return false;
  }
  showSuccess(fields.fullname);
  return true;
}

function validateEmail() {
  const v = fields.email.value.trim();
  if (v === '') {
    showError(fields.email, 'Email address is required.');
    return false;
  }
  if (!PATTERNS.email.test(v)) {
    showError(fields.email, 'Please enter a valid email (e.g. you@example.com).');
    return false;
  }
  showSuccess(fields.email);
  return true;
}

function validatePhone() {
  const v = fields.phone.value.trim();
  if (v === '') {
    showError(fields.phone, 'Phone number is required.');
    return false;
  }
  if (!PATTERNS.phone.test(v)) {
    showError(fields.phone, 'Enter a valid 10-digit Indian mobile number.');
    return false;
  }
  showSuccess(fields.phone);
  return true;
}

function validateDate() {
  const v = fields.travelDate.value;
  if (v === '') {
    showError(fields.travelDate, 'Departure date is required.');
    return false;
  }
  const chosen  = new Date(v);
  const today   = new Date();
  today.setHours(0, 0, 0, 0);
  if (chosen <= today) {
    showError(fields.travelDate, 'Departure date must be a future date.');
    return false;
  }
  // Max 2 years ahead
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 2);
  if (chosen > maxDate) {
    showError(fields.travelDate, 'Date cannot be more than 2 years in the future.');
    return false;
  }
  showSuccess(fields.travelDate);
  return true;
}

function validateDestination() {
  if (fields.destination.value === '') {
    showError(fields.destination, 'Please select a destination.');
    return false;
  }
  showSuccess(fields.destination);
  return true;
}

function validateTravellers() {
  const v = parseInt(fields.travellers.value, 10);
  if (fields.travellers.value === '' || isNaN(v)) {
    showError(fields.travellers, 'Number of travellers is required.');
    return false;
  }
  if (v < 1 || v > 12) {
    showError(fields.travellers, 'Group size must be between 1 and 12.');
    return false;
  }
  showSuccess(fields.travellers);
  return true;
}

function validatePassword() {
  const v = fields.password.value;
  if (v === '') {
    showError(fields.password, 'Password is required.');
    return false;
  }
  if (!PATTERNS.password.test(v)) {
    showError(fields.password, 'Needs uppercase, lowercase, number & symbol (min 8 chars).');
    return false;
  }
  showSuccess(fields.password);
  return true;
}

function validateConfirmPassword() {
  const v  = fields.confirmPassword.value;
  const pw = fields.password.value;
  if (v === '') {
    showError(fields.confirmPassword, 'Please confirm your password.');
    return false;
  }
  if (v !== pw) {
    showError(fields.confirmPassword, 'Passwords do not match.');
    return false;
  }
  showSuccess(fields.confirmPassword);
  return true;
}

function validateMessage() {
  const v = fields.message.value;
  if (v.length > 500) {
    showError(fields.message, 'Message must be 500 characters or fewer.');
    return false;
  }
  // Message is optional — success only if user has typed something valid
  if (v.length > 0) showSuccess(fields.message);
  else clearState(fields.message);
  return true;
}

function validateTerms() {
  const errorSpan = document.getElementById('terms-error');
  if (!fields.terms.checked) {
    fields.terms.setAttribute('aria-invalid', 'true');
    document.querySelector('.checkbox-label').classList.add('is-error');
    if (errorSpan) errorSpan.textContent = 'You must agree to the Terms & Conditions.';
    return false;
  }
  fields.terms.setAttribute('aria-invalid', 'false');
  document.querySelector('.checkbox-label').classList.remove('is-error');
  if (errorSpan) errorSpan.textContent = '';
  return true;
}

/* ─────────────────────────────────────────────
   5. MASTER VALIDATOR  (runs on submit)
   Runs every field validator, collects results.
   Only shows success if ALL pass.
───────────────────────────────────────────── */
function validateForm() {
  // Run all validators — collect into array so all fields show errors at once
  const results = [
    validateFullname(),
    validateEmail(),
    validatePhone(),
    validateDate(),
    validateDestination(),
    validateTravellers(),
    validatePassword(),
    validateConfirmPassword(),
    validateMessage(),
    validateTerms(),
  ];

  const isValid = results.every(Boolean);

  if (isValid) {
    // Show success banner (ARIA live region announces to screen readers)
    successBanner.classList.add('visible');
    successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Reset form after short delay so user sees the banner
    setTimeout(() => {
      form.reset();
      // Clear all visual states
      Object.values(fields).forEach(el => clearState(el));
      document.querySelector('.checkbox-label').classList.remove('is-error');
      resetStrengthMeter();
      updateCharCount();
    }, 3000);
  } else {
    // Hide success banner if previously shown
    successBanner.classList.remove('visible');

    // Scroll to first error
    const firstError = form.querySelector('.is-error');
    if (firstError) firstError.focus();
  }
}

/* ─────────────────────────────────────────────
   6. PREVENT DEFAULT  (Kill the page refresh)
   The most critical line — blocks the HTTP
   request that would wipe all JS state.
───────────────────────────────────────────── */
form.addEventListener('submit', function (event) {
  event.preventDefault();  // ← The shield: stops memory wipe
  validateForm();
});

/* ─────────────────────────────────────────────
   7. REAL-TIME BLUR VALIDATION
   Validates on blur (when user leaves a field).
   NOT on every keystroke — avoids infuriating
   screen reader users (per PDF guidance).
───────────────────────────────────────────── */
fields.fullname.addEventListener('blur',        validateFullname);
fields.email.addEventListener('blur',           validateEmail);
fields.phone.addEventListener('blur',           validatePhone);
fields.travelDate.addEventListener('blur',      validateDate);
fields.travelDate.addEventListener('change',    validateDate);
fields.destination.addEventListener('blur',     validateDestination);
fields.destination.addEventListener('change',   validateDestination);
fields.travellers.addEventListener('blur',      validateTravellers);
fields.password.addEventListener('blur',        validatePassword);
fields.confirmPassword.addEventListener('blur', validateConfirmPassword);
fields.message.addEventListener('blur',         validateMessage);

// Also re-validate confirm password when password changes (cross-field rule)
fields.password.addEventListener('input', function () {
  if (fields.confirmPassword.value !== '') {
    validateConfirmPassword();
  }
});

/* ─────────────────────────────────────────────
   8. PASSWORD STRENGTH METER
   Real-time feedback as the user types.
   Polite live region via aria-live="polite".
───────────────────────────────────────────── */
const strengthFill  = document.getElementById('strength-fill');
const strengthLabel = document.getElementById('strength-label');

function getPasswordStrength(pwd) {
  if (pwd.length === 0) return 0;

  let score = 0;
  if (pwd.length >= 8)  score++;
  if (pwd.length >= 12) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[#!@$%^&*\-]/.test(pwd)) score++;

  return score; // 0–6
}

function resetStrengthMeter() {
  strengthFill.style.width      = '0%';
  strengthFill.style.background = 'transparent';
  strengthLabel.textContent     = '';
  strengthLabel.style.color     = '';
}

fields.password.addEventListener('input', function () {
  const score = getPasswordStrength(this.value);

  if (this.value === '') {
    resetStrengthMeter();
    return;
  }

  const levels = [
    { max: 1, label: 'Very weak',  color: '#c0392b', pct: '16%' },
    { max: 2, label: 'Weak',       color: '#e67e22', pct: '33%' },
    { max: 3, label: 'Fair',       color: '#f1c40f', pct: '50%' },
    { max: 4, label: 'Good',       color: '#27ae60', pct: '67%' },
    { max: 5, label: 'Strong',     color: '#1a8a46', pct: '83%' },
    { max: 6, label: 'Very strong',color: '#155e30', pct: '100%' },
  ];

  // Find the right level
  const level = levels.find(l => score <= l.max) || levels[levels.length - 1];

  strengthFill.style.width      = level.pct;
  strengthFill.style.background = level.color;
  strengthLabel.textContent     = level.label;
  strengthLabel.style.color     = level.color;
});

/* ─────────────────────────────────────────────
   9. CHARACTER COUNTER for textarea
───────────────────────────────────────────── */
const charCountEl = document.getElementById('char-count');

function updateCharCount() {
  const len = fields.message.value.length;
  if (charCountEl) {
    charCountEl.textContent = len + ' / 500';
    charCountEl.style.color = len > 450 ? '#b56a00' : '';
    charCountEl.style.color = len >= 500 ? '#c0392b' : charCountEl.style.color;
  }
}

fields.message.addEventListener('input', updateCharCount);

/* ─────────────────────────────────────────────
   10. PASSWORD VISIBILITY TOGGLE
───────────────────────────────────────────── */
document.querySelectorAll('.toggle-pwd').forEach(btn => {
  btn.addEventListener('click', function () {
    const targetId = this.getAttribute('data-target');
    const input    = document.getElementById(targetId);
    const isHidden = input.type === 'password';

    input.type = isHidden ? 'text' : 'password';
    this.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
    this.style.opacity = isHidden ? '0.8' : '0.4';
  });
});

/* ─────────────────────────────────────────────
   11. SET MIN DATE for travel date input
   Prevents selecting today or past dates at
   the browser level (JS still validates).
───────────────────────────────────────────── */
(function setMinDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yyyy = tomorrow.getFullYear();
  const mm   = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const dd   = String(tomorrow.getDate()).padStart(2, '0');
  fields.travelDate.setAttribute('min', `${yyyy}-${mm}-${dd}`);

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 2);
  const my = maxDate.getFullYear();
  const mmx = String(maxDate.getMonth() + 1).padStart(2, '0');
  const ddx = String(maxDate.getDate()).padStart(2, '0');
  fields.travelDate.setAttribute('max', `${my}-${mmx}-${ddx}`);
})();

/* ─────────────────────────────────────────────
   12. LIVE INPUT FEEDBACK for name & phone
   Re-validate on input IF the field already
   has an error state (fix-as-you-type UX).
───────────────────────────────────────────── */
fields.fullname.addEventListener('input', function () {
  if (this.classList.contains('is-error')) validateFullname();
});
fields.email.addEventListener('input', function () {
  if (this.classList.contains('is-error')) validateEmail();
});
fields.phone.addEventListener('input', function () {
  if (this.classList.contains('is-error')) validatePhone();
});
fields.travellers.addEventListener('input', function () {
  if (this.classList.contains('is-error')) validateTravellers();
});
fields.confirmPassword.addEventListener('input', function () {
  if (this.classList.contains('is-error')) validateConfirmPassword();
});
