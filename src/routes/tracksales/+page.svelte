<script lang="ts">
  import Menubar from '../../lib/component/menubar.svelte';
  import { onMount, tick } from 'svelte';

  let customerOrders: any[] = [];
  let searchTerm: string = '';

  function formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    return date.toLocaleString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Bangkok'
    });
  }

  onMount(async () => {
    try {
      const res = await fetch('https://yhnn87nc5l.execute-api.us-east-1.amazonaws.com/orders');
      customerOrders = await res.json();

      await tick(); // รอ DOM render เสร็จ

      setTimeout(() => {
        const hash = window.location.hash;
        if (hash) {
          // ใช้ selector แบบปลอดภัยในกรณี ID มีอักขระพิเศษ
          const safeSelector = `[id='${CSS.escape(hash.slice(1))}']`;
          const el = document.querySelector(safeSelector);
          if (el) {
            const offset = 100; // ระยะห่างจากขอบบน (เช่น เมนู)
            const top = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }
      }, 300); // เพิ่มเวลารอ DOM เต็ม
    } catch (err) {
      console.error("❌ Failed to fetch customer orders:", err);
    }
  });

</script>

<Menubar />

<main class="page">
  <div class="container">
    <div class="search-box">
      <input type="text" placeholder="ค้นหาชื่อลูกค้า" bind:value={searchTerm} />
    </div>

    {#each customerOrders
      .slice()
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .filter(order =>
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
      ) as order}
      <div class="product-card" id={order.orderId}>
        <div class="product-layout">
          <div class="product-info">
            <h3 class="title">คำสั่งซื้อ</h3>
            <p class="entry"><span class="label">ชื่อลูกค้า:</span> {order.customerName}</p>
            <p class="entry"><span class="label">โทร:</span> {order.contact}</p>
            <p class="entry"><span class="label">ที่อยู่:</span> {order.address}</p>
            <p class="entry"><span class="label">ผู้ดูแล:</span> {order.staff}</p>
            <div class="entry">
              <span class="label">สินค้า:</span>
              <ul>
                {#each JSON.parse(order.products) as product}
                  <li>{product.name} <span class="quantity">จำนวน {product.quantity}</span></li>
                {/each}
              </ul>
            </div>
            <p class="entry"><span class="label">รหัสการสั่งซื้อ:</span> {order.orderId}</p>
            <p class="entry"><span class="label">วันที่สั่งซื้อ:</span> {formatDate(order.createdAt)}</p>
          </div>
        </div>
      </div>
    {/each}
  </div>
</main>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Cascadia+Code:ital,wght@0,200..700;1,200..700&display=swap');

  html {
    scroll-behavior: smooth;
  }

  .page {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 128px;
    padding-left: 16px;
    padding-right: 16px;
    background: #f8f3f0;
  }

  .container {
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: center;
  }

  .search-box {
    display: flex;
    width: 100%;
    border: 1px solid #999;
    border-radius: 9999px;
    background: white;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
    padding: 12px 24px;
  }

  .search-box input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: bold;
    font-family: 'Arial', sans-serif;
    background: transparent;
  }

  .product-card {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    padding: 24px;
    width: 100%;
    transition: box-shadow 0.2s ease;
    font-family: 'Cascadia Code', sans-serif;
  }

  .product-card:hover {
    box-shadow: 0 6px 20px rgba(0,0,0,0.12);
  }

  .product-info {
    display: flex;
    flex-direction: column;
    gap: 12px;
    font-size: 14px;
    line-height: 1.5;
    color: #111827;
  }

  .title {
    font-size: 20px;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 4px;
  }

  .label {
    font-weight: bold;
    margin-right: 4px;
    display: inline-block;
  }

  .entry {
    font-size: 14px;
    margin: 0;
  }

  .quantity {
    font-weight: bold;
    color: #374151;
  }
</style>
