'use strict';

// ================================
// CONSTANTS
// ================================

const USERS_KEY = 'ngecafe_users';
const SESSION_KEY = 'ngecafe_session';


// ================================
// STORAGE
// ================================

function getUsers() { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
function saveUsers(users) { localStorage.setItem(USERS_KEY, JSON.stringify(users)); }

function getSession() { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null'); }
function setSession(user) { sessionStorage.setItem(SESSION_KEY, JSON.stringify(user)); }
function clearSession() { sessionStorage.removeItem(SESSION_KEY); }


// ================================
// UI
// ================================

// Tampilkan / sembunyikan alert banner, ttl 0 = tidak auto-hide
function showAlert(id, msg, type = 'danger', ttl = 4000) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg;
    el.className = `alert-banner visible ${type}`;
    if (ttl > 0) setTimeout(() => { el.className = 'alert-banner'; }, ttl);
}

// Tampilkan / sembunyikan error di bawah field, msg kosong = hide
function setFieldError(id, msg) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg;
    el.classList.toggle('visible', !!msg);
}

// Toggle show/hide password
function togglePass(inputId, btn) {
    const input = document.getElementById(inputId);
    const icon = btn.querySelector('i');
    const show = input.type === 'password';

    input.type = show ? 'text' : 'password';
    icon.className = show ? 'bi bi-eye-slash' : 'bi bi-eye';
    btn.setAttribute('aria-label', show ? 'Sembunyikan password' : 'Tampilkan password');
}


// ================================
// VALIDATION
// ================================

function isValidEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
function isValidPassword(pwd) { return pwd.length >= 6; }