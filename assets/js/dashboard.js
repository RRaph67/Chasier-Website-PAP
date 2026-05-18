// Data Dummy untuk Recent Activity
const recentActivities = [
    {
        id: "#KS-88210",
        customer: "Siti Aminah",
        status: "Success",
        total: "Rp 450.000"
    },
    {
        id: "#KS-88209",
        customer: "Budi Santoso",
        status: "Pending",
        total: "Rp 1.200.000"
    },
    {
        id: "#KS-88208",
        customer: "Anita Wijaya",
        status: "Success",
        total: "Rp 85.500"
    }
];

// Fungsi untuk me-render tabel
function renderRecentActivity() {
    const tableBody = document.getElementById('recentActivityTable');
    tableBody.innerHTML = ''; // Bersihkan isi tabel

    recentActivities.forEach(activity => {
        // Tentukan class badge berdasarkan status
        const badgeClass = activity.status === 'Success' ? 'status-success' : 'status-pending';

        const rowHTML = `
            <tr style="border-bottom: 1px solid #f1f1f1;">
                <td class="py-3">
                    <span class="fw-bold text-dark">${activity.id}</span>
                </td>
                <td class="py-3 text-secondary">${activity.customer}</td>
                <td class="py-3">
                    <span class="status-badge ${badgeClass}">${activity.status}</span>
                </td>
                <td class="py-3 text-dark">${activity.total}</td>
                <td class="py-3 text-center">
                    <a href="#" class="action-btn" aria-label="Lihat Detail ${activity.id}">
                        <i class="bi bi-eye fs-5"></i>
                    </a>
                </td>
            </tr>
        `;

        tableBody.insertAdjacentHTML('beforeend', rowHTML);
    });
}

// Render data saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    renderRecentActivity();
});