'use strict';

// Redirect kalau sudah login
if (getSession()) window.location.replace('dashboard.html');


// ================================
// REGISTER
// ================================

document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const password = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirm').value;

    // Reset semua field error
    ['regNameError', 'regEmailError', 'regPassError', 'regConfirmError']
        .forEach(id => setFieldError(id, ''));

    let valid = true;

    if (!name) { setFieldError('regNameError', 'Nama toko wajib diisi.'); valid = false; }
    if (!email || !isValidEmail(email)) { setFieldError('regEmailError', 'Masukkan alamat email yang valid.'); valid = false; }
    if (!isValidPassword(password)) { setFieldError('regPassError', 'Password minimal 6 karakter.'); valid = false; }
    if (password !== confirm) { setFieldError('regConfirmError', 'Konfirmasi password tidak cocok.'); valid = false; }

    if (!valid) return;

    const users = getUsers();

    if (users.find(u => u.email === email)) {
        showAlert('regAlert', 'Email sudah terdaftar. Silakan login.');
        return;
    }

    users.push({ name, email, password, createdAt: new Date().toISOString() });
    saveUsers(users);

    showAlert('regAlert', 'Akun berhasil dibuat! Mengalihkan ke halaman login…', 'success', 0);
    setTimeout(() => window.location.replace('login.html'), 1600);
});