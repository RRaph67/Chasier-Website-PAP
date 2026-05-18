# NgeCafe - Website Kasir (Cashier System)

NgeCafe adalah sebuah platform website kasir digital modern yang dirancang khusus untuk mempermudah operasional manajemen kafe. Aplikasi ini menyediakan antarmuka yang bersih (*clean*), minimalis, serta responsif agar nyaman digunakan baik oleh kasir melalui perangkat mobile maupun manajemen melalui perangkat desktop.

---

## 🚀 Fitur Utama

* **Dashboard Kasir Real-Time:** Menampilkan statistik penjualan hari ini secara grafis, memantau target pesanan harian, serta melacak aktivitas transaksi terbaru secara dinamis.
* **Manajemen Status Pesanan:** Membagi alur kerja dapur dan kasir ke dalam dua kolom utama (*Siap Diambil* dan *Sedang Disiapkan*) dengan indikator badge yang terupdate secara otomatis melalui logika interaktif JavaScript.
* **Sistem Manajemen Operasional:** Memudahkan pencatatan, pemantauan, serta pengelolaan log harian toko atau kafe.
* **Pengaturan Toko & Akun (Profile):** Halaman manajemen profil staf kasir, konfigurasi detail informasi toko, metode pembayaran, hingga kustomisasi struk belanja.
* **Desain Responsif & Estetis:** Menggunakan struktur layout adaptif yang dioptimalkan untuk perangkat mobile (resolusi ponsel pintar) hingga desktop (MacBook/iPad Pro).

---

## 🛠️ Teknologi yang Digunakan

* **HTML5 (Semantic HTML):** Menggunakan elemen semantik seperti `<main>`, `<section>`, `<article>`, `<header>`, dan `<nav>` untuk struktur web yang terorganisir, performa optimal, serta ramah SEO/Aksesibilitas.
* **CSS3 & Bootstrap 5:** Framework utilitas CSS utama untuk grid sistem responsif, komponen modern, serta kustomisasi tema visual khas NgeCafe (aksen hijau tua estetis).
* **Bootstrap Icons:** Set ikon vektor untuk navigasi sidebar dan petunjuk visual aksi.
* **JavaScript (Vanilla JS):** Logika *front-end* berbasis data untuk merender elemen tabel, memindahkan status kartu pesanan secara interaktif, dan manipulasi DOM lokal tanpa dependensi eksternal berat.

---

## 📁 Struktur Proyek

Berikut adalah susunan folder dan file utama yang direkomendasikan untuk pengembangan proyek ini:

```text
Chasier-Website-PAP/
│
├── pages/
│   ├── login.html             # Halaman autentikasi masuk sistem
│   ├── dashboard.html         # Halaman utama statistik penjualan kasir
│   ├── operasional.html       # Halaman log operasional kafe
│   ├── status_pesanan.html    # Halaman manajemen alur pesanan (Dapur/Kasir)
│   └── profile.html           # Halaman pengaturan profil staf & info toko
│
├── assets/
│   ├── css/
│   │   └── global.css         # Style kustom global, palet warna NgeCafe, & utilitas grafis
│   │
│   ├── js/
│   │   ├── dashboard.js       # Logika render tabel aktivitas & grafik penjualan
│   │   └── statusPesanan.js   # Logika interaktif perpindahan kolom antrean pesanan
│   │
│   └── images/
│       ├── main_icon.png      # Logo utama NgeCafe
│       └── avatar.png         # Gambar profil pengguna / kasir aktif
│
└── README.md                  # Dokumentasi proyek
