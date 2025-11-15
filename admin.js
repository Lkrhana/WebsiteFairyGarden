// ======================= ADMIN.JS =======================

document.addEventListener("DOMContentLoaded", () => {

  if (localStorage.getItem("userRole") !== "admin") {
    alert("Akses ditolak (Admin Only)");
    window.location.href = "index.html";
    return;
  }

  const content = document.getElementById("contentArea");
  const sidebarItems = document.querySelectorAll(".sidebar li");

  sidebarItems.forEach(item => {
    item.addEventListener("click", () => {
      document.querySelector(".sidebar li.active")?.classList.remove("active");
      item.classList.add("active");
      loadPage(item.dataset.page);
    });
  });

  loadPage("dashboard");

  document.getElementById("adminLogout").addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    window.location.href = "index.html";
  });

  function loadPage(page) {
    if (page === "dashboard") return renderDashboard();
    if (page === "orders") return renderOrders();
    if (page === "products") return renderProducts();
    if (page === "customers") return renderCustomers();
  }

  // ============ DASHBOARD ============
  function renderDashboard() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const now = Date.now();
    const twoDays = 2 * 24 * 60 * 60 * 1000;

    const recentOrders = orders
      .filter(o => now - (o.createdAt || 0) <= twoDays)
      .slice(-5)
      .reverse();

    let rows = recentOrders
      .map(order => {
        const user = users.find(u => u.email === order.userEmail);
        const userName = user ? `${user.firstName} ${user.lastName}` : "Unknown User";

        return `
          <tr>
            <td>${order.orderID}</td>
            <td>${userName}</td>
            <td><span class="status diproses">Diproses</span></td>
            <td>${order.totalPrice}</td>
          </tr>
        `;
      })
      .join("");

    if (!rows) {
      rows = `<tr><td colspan="4" style="text-align:center;">Belum ada aktivitas 🌸</td></tr>`;
    }

    const totalRevenue = orders.reduce(
      (acc, o) => acc + parseInt((o.totalPrice || "0").replace(/[^\d]/g, "")), 0
    );

    content.innerHTML = `
      <h2>Selamat Datang, Admin!</h2>
      <div class="card-row">
        <div class="card">
          <div class="title">Total Pesanan</div>
          <div class="value">${orders.length}</div>
        </div>
        <div class="card">
          <div class="title">Pendapatan Bulan Ini</div>
          <div class="value">Rp. ${totalRevenue.toLocaleString("id-ID")}</div>
        </div>
        <div class="card">
          <div class="title">Produk Terjual</div>
          <div class="value">${orders.length}</div>
        </div>
      </div>

      <h3>Aktivitas Terbaru (2 Hari)</h3>
      <div class="table-box">
        <table>
          <tr>
            <th>ID</th>
            <th>Pelanggan</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
          ${rows}
        </table>
      </div>
    `;
  }

  // ============ DELETE ============
  function deleteOrder(orderID) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  const idNum = Number(orderID);        // ← fix utama

  orders = orders.filter(o => Number(o.orderID) !== idNum);

  localStorage.setItem("orders", JSON.stringify(orders));
  alert("Pesanan berhasil dihapus.");
  renderOrders();
}

  // ============ UPDATE STATUS ============
  function updateStatus(orderID, newStatus) {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const index = orders.findIndex(o => o.orderID === orderID);

    if (index !== -1) {
      orders[index].status = newStatus;
      localStorage.setItem("orders", JSON.stringify(orders));

      refreshAdminData();
    }
  }

  function refreshAdminData() {
    const activePage = document.querySelector(".sidebar li.active")?.dataset.page;
    if (activePage === "orders") {
      renderOrders();
    } else if (activePage === "dashboard") {
      renderDashboard();
    }
  }


  // ============ ORDERS PAGE ============
  function renderOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const searchValue = document.getElementById("searchOrder")?.value?.toLowerCase() || "";

    const filtered = orders.filter(o => {
      const user = users.find(u => u.email === o.userEmail);
      const name = user ? `${user.firstName} ${user.lastName}` : o.userEmail;
      return name.toLowerCase().includes(searchValue);
    });

    let rows = filtered
      .map((o, i) => {
        const user = users.find(u => u.email === o.userEmail);
        const name = user ? `${user.firstName} ${user.lastName}` : o.userEmail;

        return `
          <tr>
            <td>${o.orderID}</td>
            <td>${name}</td>
            <td>${o.deliveryDate}</td>

            <td>
              <select class="status-dropdown" data-id="${o.orderID}">
                <option value="Diproses" ${o.status === "Diproses" ? "selected" : ""}>Diproses</option>
                <option value="Dikirim" ${o.status === "Dikirim" ? "selected" : ""}>Dikirim</option>
                <option value="Selesai" ${o.status === "Selesai" ? "selected" : ""}>Selesai</option>
              </select>
            </td>

            <td>
              <button class="button-small detail-btn" data-id="${o.orderID}">Detail</button>
              <button class="button-small delete-btn" data-id="${o.orderID}" style="background:#ffb3b3;">Delete</button>
            </td>
          </tr>
        `;
      })
      .join("");

    content.innerHTML = `
      <h2>Pesanan Pelanggan</h2>

      <div class="order-controls">
        <div class="search-center">
          <div class="search-box">
            <input id="searchOrder" type="text" placeholder="Search Customer">
            <img src="https://cdn-icons-png.flaticon.com/512/622/622669.png">
          </div>
        </div>
      </div>

      <div class="table-box">
        <table>
          <tr>
            <th>ID</th>
            <th>Pelanggan</th>
            <th>Tanggal</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
          ${rows}
        </table>
      </div>
    `;

    document.getElementById("searchOrder").addEventListener("input", renderOrders);

    document.querySelectorAll(".status-dropdown").forEach(select => {
      select.addEventListener("change", e => {
        updateStatus(e.target.dataset.id, e.target.value);
      });
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (confirm("Hapus pesanan ini?")) {
          deleteOrder(btn.dataset.id);
        }
      });
    });

    document.querySelectorAll(".detail-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        localStorage.setItem("adminViewOrderID", btn.dataset.id);
        window.location.href = "admin-order.html";
      });
    });
  }

  function renderOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const content = document.getElementById("contentArea");

    let searchValue = "";
    let sortValue = "latest";

    // --- UI ATAS: Judul, Search, Sort
    content.innerHTML = `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:25px;">
        <h2 style="margin-bottom:0;font-size:1.5rem;text-decoration:underline;text-decoration-thickness:2px;">Pesanan Pelanggan</h2>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <div style="flex:1;display:flex;justify-content:center;">
          <div style="position:relative;min-width:230px;">
            <input type="text" id="orderSearch" placeholder="Search"
              style="padding:10px 36px 10px 14px;width:210px;border-radius:8px;border:1px solid #eee;box-shadow:0 2px 5px rgba(0,0,0,0.06);font-size:1rem;">
              <span id="orderSearchBtn" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);color:#999;cursor:pointer;">
                <i class="fa-solid fa-magnifying-glass"></i>
              </span>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="font-size:0.9rem;color:#666;margin-right:6px;">SORT BY</span>
          <select id="orderSort" style="padding:8px 16px;border-radius:6px;border:1px solid #eee;">
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
      <div class="table-box">
        <table>
          <tr>
            <th style="min-width:100px;">ID Pesanan</th>
            <th>Nama Pelanggan</th>
            <th>Tanggal</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
          <tbody id="ordersTbody"></tbody>
        </table>
      </div>
    `;

    function updateStatus(orderID, newStatus) {
      let orders = JSON.parse(localStorage.getItem("orders")) || [];
      const idx = orders.findIndex(o => String(o.orderID) === String(orderID));
      if (idx > -1) {
        orders[idx].status = newStatus;
        localStorage.setItem("orders", JSON.stringify(orders));
      }
    }

    // --- FILTER, SORT, & TABLE RENDER ---
    function updateTable() {
      let filtered = orders
        .filter(o => {
          if (!searchValue) return true;
          const user = users.find(u => u.email === o.userEmail);
          const name = user ? `${user.firstName} ${user.lastName}` : o.userEmail;
          return (
            String(o.orderID).includes(searchValue) ||
            name.toLowerCase().includes(searchValue)
          );
        })
        .slice();

      // Sort
      if (sortValue === "latest") filtered.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      if (sortValue === "oldest") filtered.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));

      const tbody = document.getElementById("ordersTbody");
      tbody.innerHTML = "";

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:#aaa">Tidak ada pesanan ditemukan.</td></tr>`;
        return;
      }

      filtered.forEach(order => {
        const user = users.find(u => u.email === order.userEmail);
        const name = user ? `${user.firstName} ${user.lastName}` : order.userEmail;
        // Status logic
        let status = order.status || "Diproses";
        let badge = "";
        let selected = { proses: "", kirim: "", selesai: "" };
        if (status === "Diproses") {
          badge = `<span class="status-badge status-proses">DIPROSES</span>`;
          selected.proses = "selected";
        }
        if (status === "Dikirim") {
          badge = `<span class="status-badge status-kirim">DIKIRIM</span>`;
          selected.kirim = "selected";
        }
        if (status === "Selesai") {
          badge = `<span class="status-badge status-selesai">SELESAI</span>`;
          selected.selesai = "selected";
        }

        // Status dropdown mimic
        tbody.innerHTML += `
          <tr>
            <td>${order.orderID}</td>
            <td>${name}</td>
            <td>${order.deliveryDate || "-"}</td>
            <td style="text-align:center">
              <select class="status-dropdown" data-id="${order.orderID}">
                <option value="Selesai" ${selected.selesai}>SELESAI</option>
                <option value="Dikirim" ${selected.kirim}>DIKIRIM</option>
                <option value="Diproses" ${selected.proses}>DIPROSES</option>
              </select>
            <td>
              <button style="background:#eaf4df;color:#333;border-radius:7px;padding:8px 14px;font-size:0.93rem;border:1.5px solid #c7e4c4;display:flex;align-items:center;gap:4px;cursor:pointer" class="detail-btn" data-id="${order.orderID}">
                <i class="fa-solid fa-eye"></i> Lihat Detail Pesanan
              </button>
            </td>
          </tr>
        `;
      });

      // Status event
      document.querySelectorAll(".status-dropdown").forEach(sel => {
        sel.addEventListener("change", e => {
          updateStatus(sel.dataset.id, sel.value);
          updateTable(); // agar UI langsung update badge
        });
      });

      // Lihat detail pesanan
      document.querySelectorAll(".detail-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          localStorage.setItem("adminViewOrderID", btn.dataset.id);
          window.location.href = "admin-order.html";
        });
      });
    }

    // --- Event search & sort handler
    document.getElementById("orderSearchBtn").addEventListener("click", () => {
      const inp = document.getElementById("orderSearch");
      searchValue = inp.value.trim().toLowerCase();
      updateTable();
    });
    document.getElementById("orderSearch").addEventListener("keypress", e => {
      if (e.key === "Enter") {
        searchValue = e.target.value.trim().toLowerCase();
        updateTable();
      }
    });
    document.getElementById("orderSort").addEventListener("change", e => {
      sortValue = e.target.value;
      updateTable();
    });

    updateTable();
  }

  // ============ PRODUCTS PAGE ============
  function renderProducts() {
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Kalau belum ada data, isi dengan data dummy
    if (products.length === 0) {
      products = [
        { id: "rose-harmony", name: "Rose Harmony", category: "Birthday", stock: 15, price: 250000, img: "https://i.pinimg.com/1200x/68/a1/48/68a14894f37c6659176c61a20a57bb0d.jpg" },
        { id: "lily-blossom", name: "Lily Blossom", category: "Mother's Day", stock: 20, price: 275000, img: "https://i.pinimg.com/736x/99/e2/ab/99e2ab5199035c32e4a4b1f564e76d0c.jpg" },
        { id: "tulip-delight", name: "Tulip Delight", category: "Graduation", stock: 12, price: 300000, img: "https://i.pinimg.com/736x/bd/6a/ec/bd6aec14520f3b5763ac221063db719e.jpg" },
        { id: "peony-grace", name: "Peony Grace", category: "Anniversary", stock: 18, price: 285000, img: "https://i.pinimg.com/736x/84/86/2b/84862b87ef673479e8487f2dd549c75e.jpg" },
        { id: "sunflower-joy", name: "Sunflower Joy", category: "Birthday", stock: 25, price: 260000, img: "https://i.pinimg.com/1200x/93/ab/8c/93ab8c4747d23016d3b6cbc1194c0a63.jpg" },
        { id: "daisy-charm", name: "Daisy Charm", category: "Birthday", stock: 30, price: 230000, img: "https://i.pinimg.com/736x/1e/df/fb/1edffbba617cbfe9c3576aead8e823ee.jpg" },
        { id: "orchid-dream", name: "Orchid Dream", category: "Just Because", stock: 10, price: 350000, img: "https://i.pinimg.com/1200x/14/2f/b2/142fb23313806b79364dd24c19447b8a.jpg" },
        { id: "carnation-bliss", name: "Carnation Bliss", category: "Mother's Day", stock: 22, price: 240000, img: "https://i.pinimg.com/1200x/9e/71/1e/9e711e33e43ad8a805459c941bd8ff01.jpg" }
      ];
      localStorage.setItem("products", JSON.stringify(products));
    }

    let rows = products.map((p, i) => `
      <tr>
        <td>
          <div class="product-thumb">
            <img src="${p.img}" alt="${p.name}">
          </div>
        </td>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>${p.stock}</td>
        <td>Rp. ${p.price.toLocaleString("id-ID")}</td>
        <td>
          <button class="button-small edit-product-btn" data-id="${p.id}">
            <i class="fa-solid fa-pen"></i> Edit
          </button>
          <button class="button-small delete-btn delete-product-btn" data-id="${p.id}">
            <i class="fa-solid fa-trash"></i> Hapus
          </button>
        </td>
      </tr>
    `).join("");

    content.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:25px;">
        <h2>Daftar Produk</h2>
        <button class="button-small" id="addProductBtn" style="background:#dce9d1;padding:10px 20px;">
          <i class="fa-solid fa-plus"></i> Tambah Produk
        </button>
      </div>

      <div class="table-box">
        <table>
          <tr>
            <th>Gambar</th>
            <th>Nama Produk</th>
            <th>Kategori</th>
            <th>Stok</th>
            <th>Harga</th>
            <th>Aksi</th>
          </tr>
          ${rows}
        </table>
      </div>

      <!-- MODAL TAMBAH/EDIT PRODUK -->
      <div id="productModal" class="product-modal" style="display:none;">
        <div class="modal-content-product">
          <span class="close-modal" id="closeProductModal">&times;</span>
          <h3 id="modalTitle">Tambah Produk</h3>
          <form id="productForm">
            <label>Nama Produk</label>
            <input type="text" id="productName" required>

            <label>Kategori</label>
            <select id="productCategory" required>
              <option value="">Pilih Kategori</option>
              <option value="Birthday">Birthday</option>
              <option value="Mother's Day">Mother's Day</option>
              <option value="Just Because">Just Because</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Graduation">Graduation</option>
            </select>

            <label>Stok</label>
            <input type="number" id="productStock" min="0" required>

            <label>Harga</label>
            <input type="number" id="productPrice" min="0" required>

            <label>URL Gambar</label>
            <input type="text" id="productImg" placeholder="https://..." required>

            <input type="hidden" id="productId">

            <button type="submit" class="button-small" style="background:#73855c;color:white;width:100%;margin-top:15px;">
              Simpan
            </button>
          </form>
        </div>
      </div>
    `;

    // === EVENT LISTENERS ===
    
    // Tambah Produk
    document.getElementById("addProductBtn").addEventListener("click", () => {
      document.getElementById("modalTitle").textContent = "Tambah Produk";
      document.getElementById("productForm").reset();
      document.getElementById("productId").value = "";
      document.getElementById("productModal").style.display = "flex";
    });

    // Close Modal
    document.getElementById("closeProductModal").addEventListener("click", () => {
      document.getElementById("productModal").style.display = "none";
    });

    // Edit Produk
    document.querySelectorAll(".edit-product-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const product = products.find(p => p.id === id);
        
        if (product) {
          document.getElementById("modalTitle").textContent = "Edit Produk";
          document.getElementById("productName").value = product.name;
          document.getElementById("productCategory").value = product.category;
          document.getElementById("productStock").value = product.stock;
          document.getElementById("productPrice").value = product.price;
          document.getElementById("productImg").value = product.img;
          document.getElementById("productId").value = product.id;
          document.getElementById("productModal").style.display = "flex";
        }
      });
    });

    // Delete Produk
    document.querySelectorAll(".delete-product-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (confirm("Hapus produk ini?")) {
          const id = btn.dataset.id;
          let products = JSON.parse(localStorage.getItem("products")) || [];
          products = products.filter(p => p.id !== id);
          localStorage.setItem("products", JSON.stringify(products));
          renderProducts();
        }
      });
    });

    // Submit Form (Tambah/Edit)
    document.getElementById("productForm").addEventListener("submit", (e) => {
      e.preventDefault();
      
      const id = document.getElementById("productId").value;
      const name = document.getElementById("productName").value.trim();
      const category = document.getElementById("productCategory").value;
      const stock = parseInt(document.getElementById("productStock").value);
      const price = parseInt(document.getElementById("productPrice").value);
      const img = document.getElementById("productImg").value.trim();

      let products = JSON.parse(localStorage.getItem("products")) || [];

      if (id) {
        // Edit existing
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
          products[index] = { id, name, category, stock, price, img };
        }
      } else {
        // Add new
        const newId = name.toLowerCase().replace(/\s+/g, '-');
        products.push({ id: newId, name, category, stock, price, img });
      }

      localStorage.setItem("products", JSON.stringify(products));
      document.getElementById("productModal").style.display = "none";
      renderProducts();
      alert("Produk berhasil disimpan!");
    });
  }

  // ============ CUSTOMERS PAGE ============
  function renderCustomers() {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    let rows = users
      .map((u, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${u.firstName} ${u.lastName}</td>
          <td>${u.email}</td>
          <td>${u.phone}</td>
        </tr>
      `)
      .join("");

    content.innerHTML = `
      <h2>Data Pelanggan</h2>
      <div class="table-box">
        <table>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Telepon</th>
          </tr>
          ${rows}
        </table>
      </div>
    `;
  }
});