<script>
    import Menubar from '../../lib/component/menubar.svelte';
  </script>
  
  <Menubar />
  
  <main>
    <div class="product-container">
      <!-- กล่องซ้าย: รูปภาพ + สต๊อก -->
      <div class="image-section">
        <div class="image-box">
          <p>Img</p>
          <p>สินค้าตัวอย่าง</p>
        </div>
        <p class="stock-text">stock: 12</p>
      </div>
  
      <!-- กล่องขวา: รายละเอียด -->
      <div class="detail-section">
        <h1 class="product-name">ชื่อสินค้า</h1>
        <p class="product-price">1000 Baht</p>
        <p class="product-description">รายละเอียดสินค้าแบบย่อ เช่น สเปค หรือคุณสมบัติ</p>
      </div>
    </div>
  
    <!-- ตารางข้อมูล -->
    <div class="table-section">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>อื่น ๆ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>001</td>
            <td>สินค้า A</td>
            <td>-</td>
          </tr>
          <tr>
            <td>002</td>
            <td>สินค้า B</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
  
  <style>
    main {
      background-color: #faf5f2;
      padding: 20px;
      font-family: sans-serif;
    }
  
    .product-container {
      display: flex;
      gap: 30px;
      margin-bottom: 40px;
    }
  
    .image-section {
      width: 30%;
    }
  
    .image-box {
      width: 100%;
      height: 200px;
      background-color: #ddd;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 1px solid #aaa;
      border-radius: 5px;
      margin-bottom: 10px;
    }
  
    .stock-text {
      font-size: 14px;
      color: #444;
    }
  
    .detail-section {
      flex: 1;
    }
  
    .product-name {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }
  
    .product-price {
      color: green;
      font-size: 20px;
      margin-bottom: 10px;
    }
  
    .product-description {
      font-size: 14px;
      color: #555;
    }
  
    .table-section table {
      width: 100%;
      border-collapse: collapse;
    }
  
    .table-section th,
    .table-section td {
      border: 1px solid #999;
      padding: 8px;
      text-align: left;
    }
  
    .table-section th {
      background-color: #eee;
    }
  </style>
  