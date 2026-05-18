'use strict';

// Redirect kalau sudah login
if (getSession()) window.location.replace('dashboard.html');


// ================================
// LOGIN
// ================================

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        showAlert('loginAlert', 'Email dan password wajib diisi.');
        return;
    }

    const user = getUsers().find(u => u.email === email && u.password === password);

    if (!user) {
        showAlert('loginAlert', 'Email atau password salah. Silakan coba lagi.');
        return;
    }

    setSession(user);
    showAlert('loginAlert', `Berhasil masuk! Halo, ${user.name}`, 'success', 0);
    setTimeout(() => window.location.replace('opPengguna.html'), 900);
});
