// Data Dummy Pesanan
let orders = {
    ready: [
        { id: "001", type: "payment" }, 
        { id: "002", type: "normal" },
        { id: "003", type: "normal" },
        { id: "004", type: "normal" }
    ],
    preparing: [
        { id: "005" },
        { id: "006" },
        { id: "007" },
        { id: "008" }
    ]
};

// Fungsi Utama untuk me-render UI
function renderOrders() {
    renderReadyOrders();
    renderPreparingOrders();
    updateBadges();
}

function renderReadyOrders() {
    const container = document.getElementById('listSiapDiambil');
    container.innerHTML = ''; // Bersihkan kontainer

    orders.ready.forEach(order => {
        let cardHTML = '';

        if (order.type === 'payment') {
            // UI Khusus Silahkan Membayar
            cardHTML = `
                <article class="card rounded-3 border-0 shadow-sm order-card order-card-payment" onclick="completePayment('${order.id}')">
                    <div class="card-body p-3 d-flex justify-content-between align-items-center">
                        <div>
                            <small class="d-block mb-1 text-white-50">Silahkan Membayar</small>
                            <h4 class="m-0 fw-bold text-white fs-3">#${order.id}</h4>
                        </div>
                        <div class="bg-white rounded-circle d-flex align-items-center justify-content-center" style="width: 32px; height: 32px;">
                            <i class="bi bi-check-lg text-success-dark fw-bold"></i>
                        </div>
                    </div>
                </article>
            `;
        } else {
            // UI Normal Ready
            cardHTML = `
                <article class="card rounded-3 border border-success-subtle shadow-sm order-card bg-white" onclick="completeOrder('${order.id}')">
                    <div class="card-body p-3 d-flex justify-content-between align-items-center">
                        <div>
                            <small class="d-block text-secondary mb-1" style="font-size: 0.75rem;">ORDER</small>
                            <h4 class="m-0 fw-bold text-success-dark fs-4">#${order.id}</h4>
                        </div>
                        <span class="fw-bold text-success-dark" style="font-size: 0.85rem;">READY</span>
                    </div>
                </article>
            `;
        }
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}

function renderPreparingOrders() {
    const container = document.getElementById('listSedangDisiapkan');
    container.innerHTML = '';

    orders.preparing.forEach(order => {
        const cardHTML = `
            <div class="col-6">
                <article class="card rounded-3 border border-secondary-subtle shadow-sm order-card h-100 bg-light" onclick="moveToReady('${order.id}')">
                    <div class="card-body p-3 text-center d-flex flex-column justify-content-center">
                        <small class="d-block text-secondary mb-1" style="font-size: 0.75rem;">ORDER</small>
                        <h5 class="m-0 fw-bold text-secondary-dark fs-6">#${order.id}</h5>
                    </div>
                </article>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// Update Angka pada Badge Header
function updateBadges() {
    document.getElementById('countReady').innerText = orders.ready.length;
    document.getElementById('countPreparing').innerText = orders.preparing.length;
}

/* ==========================================
   FITUR INTERAKTIVITAS SEDERHANA
   ========================================== */

function moveToReady(orderId) {

    const index = orders.preparing.findIndex(o => o.id === orderId);
    if (index > -1) {

        const orderToMove = orders.preparing.splice(index, 1)[0];
        orderToMove.type = 'normal'; 
        orders.ready.push(orderToMove);
        renderOrders(); 
    }
}


function completePayment(orderId) {
    if (confirm(`Konfirmasi pembayaran untuk pesanan #${orderId}?`)) {
        orders.ready = orders.ready.filter(o => o.id !== orderId);
        renderOrders();
    }
}

function completeOrder(orderId) {
    if (confirm(`Pesanan #${orderId} sudah diambil oleh kustomer?`)) {
        orders.ready = orders.ready.filter(o => o.id !== orderId);
        renderOrders();
    }
}

document.addEventListener('DOMContentLoaded', renderOrders);