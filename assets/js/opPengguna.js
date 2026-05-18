// Data dummy produk (Sesuai gambar)
const products = [
    { id: 1, name: 'Nasi Goreng', price: 15000, stock: 50, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=300' },
    { id: 2, name: 'Mie Ayam', price: 13000, stock: 50, image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=300' },
    { id: 3, name: 'Es Teh', price: 5000, stock: 50, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=300' },
    { id: 4, name: 'Kopi Susu', price: 12000, stock: 50, image: 'https://i.pinimg.com/736x/7f/94/20/7f94202f7ea02b30f68d6744ef580e2d.jpg' },
    { id: 5, name: 'Ayam Bakar', price: 25000, stock: 50, image: 'https://i.pinimg.com/1200x/02/b7/e4/02b7e42ec249365039ca6963cd016ab3.jpg' },
    { id: 6, name: 'Roti Bakar', price: 10000, stock: 50, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=300' },
];

let cart = [];

// Format Rupiah
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
};

// Render Produk ke Layar
function renderProducts() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';

    products.forEach(product => {
        const article = document.createElement('article');
        article.className = 'col';
        article.innerHTML = `
            <div class="product-card h-100 d-flex flex-column" onclick="addToCart(${product.id})">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="p-2 p-lg-3 flex-grow-1 d-flex flex-column justify-content-between bg-white border border-top-0 rounded-bottom-3">
                    <div>
                        <h3 class="fs-6 fw-bold m-0 text-dark" style="font-size: 0.9rem !important;">${product.name}</h3>
                        <p class="text-success fw-bold m-0 mt-1">${formatRupiah(product.price)}</p>
                    </div>
                    <small class="text-muted mt-2" style="font-size: 0.75rem;">Stok: ${product.stock}</small>
                </div>
            </div>
        `;
        grid.appendChild(article);
    });
}

// Tambah ke Keranjang
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    updateCartUI();
}

// Ubah Kuantitas
function updateQty(productId, delta) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        cart[itemIndex].qty += delta;
        if (cart[itemIndex].qty <= 0) {
            cart.splice(itemIndex, 1); // Hapus jika qty 0
        }
        updateCartUI();
    }
}

// Update Tampilan Keranjang
function updateCartUI() {
    const cartContainer = document.getElementById('cartItems');
    const emptyState = document.getElementById('emptyCartState');
    let subtotal = 0;

    // Bersihkan isi keranjang (kecuali empty state)
    Array.from(cartContainer.children).forEach(child => {
        if (child.id !== 'emptyCartState') child.remove();
    });

    if (cart.length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';

        cart.forEach(item => {
            const itemTotal = item.price * item.qty;
            subtotal += itemTotal;

            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <div>
                    <h4 class="m-0 fs-6 fw-bold" style="font-size: 0.85rem !important;">${item.name}</h4>
                    <span class="text-success fw-semibold" style="font-size: 0.8rem;">${formatRupiah(item.price)}</span>
                </div>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                    <span class="fw-bold" style="font-size: 0.85rem; width: 20px; text-align: center;">${item.qty}</span>
                    <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                </div>
            `;
            cartContainer.appendChild(div);
        });
    }

    // Update Total
    document.getElementById('cartSubtotal').innerText = formatRupiah(subtotal);
    document.getElementById('cartTotal').innerText = formatRupiah(subtotal);
    document.getElementById('inputBayar').dataset.total = subtotal; 
    calculateChange(); 
}

// Hitung Kembalian
function calculateChange() {
    const total = parseInt(document.getElementById('inputBayar').dataset.total) || 0;
    const bayar = parseInt(document.getElementById('inputBayar').value) || 0;
    const textKembalian = document.getElementById('textKembalian');

    if (bayar >= total && total > 0) {
        const kembalian = bayar - total;
        textKembalian.innerText = formatRupiah(kembalian);
        textKembalian.classList.remove('text-danger');
        textKembalian.classList.add('text-success-dark');
    } else if (bayar > 0 && bayar < total) {
        textKembalian.innerText = "Uang Kurang";
        textKembalian.classList.remove('text-success-dark');
        textKembalian.classList.add('text-danger');
    } else {
        textKembalian.innerText = "-";
        textKembalian.classList.remove('text-danger', 'text-success-dark');
    }
}

// Kosongkan Keranjang
function clearCart() {
    if (cart.length > 0 && confirm('Kosongkan keranjang?')) {
        cart = [];
        document.getElementById('inputBayar').value = '';
        updateCartUI();
    }
}

// Proses Transaksi
function processTransaction() {
    const total = parseInt(document.getElementById('inputBayar').dataset.total) || 0;
    const bayar = parseInt(document.getElementById('inputBayar').value) || 0;

    if (cart.length === 0) {
        alert('Keranjang masih kosong!');
        return;
    }

    if (bayar < total) {
        alert('Nominal uang bayar kurang dari total belanja!');
        return;
    }

    alert(`Transaksi Berhasil!\nTotal: ${formatRupiah(total)}\nBayar: ${formatRupiah(bayar)}\nKembalian: ${formatRupiah(bayar - total)}`);

    // Reset setelah berhasil
    cart = [];
    document.getElementById('inputBayar').value = '';
    updateCartUI();
}

// Inisialisasi saat DOM dimuat
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
});