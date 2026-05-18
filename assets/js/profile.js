/**
 * Logika Sederhana Interaksi Halaman Profile NgeCafe
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Logika Upload Foto Profil
    const btnEditFoto = document.getElementById('btnEditFoto');
    const uploadFotoInput = document.getElementById('uploadFotoInput');

    if (btnEditFoto && uploadFotoInput) {
        // Ketika tombol edit (pensil) diklik, trigger input file tersembunyi
        btnEditFoto.addEventListener('click', () => {
            uploadFotoInput.click();
        });

        // Simulasi ketika foto dipilih
        uploadFotoInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                const fileName = e.target.files[0].name;
                // Di real project, lakukan logic FileReader / Upload ke server
                alert(`Mencoba mengunggah foto: ${fileName}\n(Fitur upload sedang dikembangkan)`);
            }
        });
    }

    // 2. Logika Logout Confirmation
    const handleLogout = () => {
        const confirmLogout = confirm('Apakah Anda yakin ingin keluar dari akun NgeCafe?');
        if (confirmLogout) {
            window.location.href = 'login.html';
        }
    };

    const btnLogoutDesktop = document.getElementById('btnLogoutDesktop');
    const btnLogoutMobile = document.getElementById('btnLogoutMobile');

    if (btnLogoutDesktop) btnLogoutDesktop.addEventListener('click', handleLogout);
    if (btnLogoutMobile) btnLogoutMobile.addEventListener('click', handleLogout);
});

// 3. Fungsi Global untuk klik item setting list
window.handleSettingClick = function (settingName) {
    // Bisa diganti dengan modal atau navigasi halaman
    alert(`Membuka menu pengaturan: ${settingName}`);
};