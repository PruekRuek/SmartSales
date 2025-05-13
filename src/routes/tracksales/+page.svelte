<script lang="ts">
  
  import Menubar from '../../lib/component/menubar.svelte';
</script>

<Menubar />

<main class="page">
  <div class="container">

    <!-- 🔍 Search -->
    <div class="search-box">
      <span class="search-icon">🔍</span>
      <input type="text" placeholder="ค้นหาชื่อลูกค้า" />
    </div>

    <!-- 🛒 สินค้า -->
    <div class="product-card">
      <div class="product-layout">
        <img src="src/lib/images/camera.png" alt="สินค้า" />

        <div class="product-info">
          <h3>สินค้า 1</h3>
          <h5>นายสุชาติ เสียของ</h5>
          <p class="compacts">
            <span class="label">โทร:</span>
            <span>081–234–5678</span>
          </p>
          <p class="compact">
            <span class="label">ที่อยู่:</span>
            <span>123/45 หมู่บ้านตัวอย่าง แขวงบางนา เขตบางนา กรุงเทพฯ</span>
          </p>
          <h5>ผู้ดูแล : สมชาย</h5>
        </div>
      </div>

      <!-- ✅ สถานะ timeline อยู่ล่างสุดของกล่อง -->
      <div class="status-wrapper">
        <div class="status">
          <div class="step active">จอง</div>
          <div class="line"></div>
          <div class="step">ชำระแล้ว</div>
          <div class="line"></div>
          <div class="step">กำลังส่งของ</div>
          <div class="line"></div>
          <div class="step">ได้รับของแล้ว</div>
        </div>
      </div>
    </div>

  </div>
</main>

<style>
   @import url('https://fonts.googleapis.com/css2?family=Cascadia+Code:ital,wght@0,200..700;1,200..700&display=swap');
  .topbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 50;
  }

  .page {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 128px;
    padding-left: 16px;
    padding-right: 16px;
  }

  .container {
    width: 45%;
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: center;
  }

  /* ===== Search Box ===== */
  .search-box {
    display: flex;
    width: 100%;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    background: white;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  }

  .search-icon {
    background: #f3f4f6;
    padding: 8px 16px;
    color: #6b7280;
    font-size: 18px;
    display: flex;
    align-items: center;
  }

  .search-box input {
    flex: 1;
    border: none;
    padding: 8px 16px;
    font-size: 14px;
    outline: none;
  }

  /* ===== Product Card ===== */
  .product-card {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    padding: 24px;
    width: 100%;
    transition: box-shadow 0.2s ease;
  }

  .product-card:hover {
    box-shadow: 0 6px 20px rgba(0,0,0,0.12);
  }

  .product-layout {
    display: flex;
    gap: 24px;
    align-items: flex-start;
  }

  .product-card img {
    width: 140px;
    height: 140px;
    object-fit: cover;
    border-radius: 12px;
  }

  .product-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .product-info h3 {
    font-size: 18px;
    font-family: "Cascadia Code", sans-serif;
    color: #374151;
    font-weight: 600;
    margin: 0;
  }

  .product-info h5 {
    font-size: 15px;
    font-family: "Cascadia Code", sans-serif;
    color: #111827;
    font-weight: 500;
    margin: 0;
  }

  /* ===== Status Timeline ===== */
  .status-wrapper {
    margin-top: 24px;
  }

  .status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: #6b7280;
  }

  .step {
    white-space: nowrap;
    font-weight: 500;
  }

  .step.active {
    color: #dc2626;
    font-weight: 700;
  }

  .line {
    flex: 1;
    height: 2px;
    background: #d1d5db;
    margin: 0 8px;
  }
  .compact {
  margin: -10px 0;
  font-size: 13px;
  line-height: 1.3;
}
  .compacts {
  margin: 0px 0;
  font-size: 13px;
  line-height: 1.3;
}

.label {
  display: inline;
  font-weight: bold;
  margin-right: 1px; /* ปรับตรงนี้ให้ชิดขึ้นหรือลดลงได้ */
}


</style>
