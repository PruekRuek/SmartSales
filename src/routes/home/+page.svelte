<script lang="ts">
  import Menubar from '../../lib/component/menubar.svelte';
  import { onMount, tick } from 'svelte';
  import { goto } from '$app/navigation';

  let customerOrders: any[] = [];

  function isToday(dateString: string): boolean {
    const today = new Date();
    const date = new Date(dateString);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  onMount(async () => {
    try {
      const res = await fetch('https://yhnn87nc5l.execute-api.us-east-1.amazonaws.com/orders');
      const allOrders = await res.json();
      customerOrders = allOrders.filter((order: any) => isToday(order.createdAt));

      await tick();
      const hash = window.location.hash;
      if (hash) {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (err) {
      console.error("❌ Failed to fetch customer orders:", err);
    }
  });

  function formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    return date.toLocaleString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Bangkok',
    });
  }

  function handleRowClick(orderId: string) {
    goto(`/tracksales#${orderId}`);
  }
</script>

<Menubar />

<main class="main-content">
  <div class="content">
    <div class="category-grid">
      <div class="category-card">
        <a href="/product?category=ELECTRONIC">
          <img src="src/lib/images/product/Electronics.png" alt="Electronics" />
          <div class="card-title">Electronics</div>
        </a>
      </div>
      <div class="category-card">
        <a href="/product?category=ELECTRICAL_APPLIANCE">
          <img src="src/lib/images/product/Electrical Appliances.png" alt="Electrical Appliances" />
          <div class="card-title">Electrical Appliances</div>
        </a>
      </div>
      <div class="category-card">
        <a href="/product?category=CONSTRUCTION_MATERIAL">
          <img src="src/lib/images/product/Construction Materials.png" alt="Construction Materials" />
          <div class="card-title">Construction Materials</div>
        </a>
      </div>
    </div>
  </div>

  <h2 style="text-align:center; margin-top: 60px;">รายการคำสั่งซื้อสินค้าวันนี้</h2>

  <div class="order-table-wrapper">
    <table class="order-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>ชื่อลูกค้า</th>
          <th>พนักงานที่ดูแล</th>
          <th>รหัสการสั่งซื้อ</th>
          <th>วันที่สั่งซื้อ</th>
        </tr>
      </thead>
      <tbody>
        {#each customerOrders
          .slice()
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          as order, index}
          <tr class="clickable-row" id={order.orderId} on:click={() => handleRowClick(order.orderId)}>
            <td>{index + 1}</td>
            <td>{order.customerName}</td>
            <td>{order.staff}</td>
            <td>{order.orderId}</td>
            <td>{formatDate(order.createdAt)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</main>


<style>
  html {
    scroll-behavior: smooth;
  }
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-family: "Cascadia Code", sans-serif;
  }
  .content {
    flex: 1;
    padding: 60px;
  }
  .category-grid {
    display: flex;
    flex-wrap: wrap;
    column-gap: 80px;
    row-gap: 40px;
    justify-content: center;
    margin: 0 auto;
  }
  .category-card {
    margin-bottom: 5px;
    margin-top: 5px;
    background-color: #ffffff;
    padding: 10px;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 280px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .category-card a {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    gap: 10px;
    padding-top: 20px;
  }
  .category-card:hover {
    transform: translateY(-5px);
  }
  .category-card img {
    width: 60%;
    height: 60%;
    object-fit: contain;
    margin-bottom: 5px;
  }
  .card-title {
    text-align: center;
    color: #333;
    font-size: 18px;
    font-family: "Cascadia Code", sans-serif;
  }
  .order-table-wrapper {
    margin: 40px auto;
    overflow-x: auto;
    border-radius: 10px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    max-width: 100%;
    width: fit-content;
  }
  .order-table {
    width: 100%;
    border-collapse: collapse;
    font-family: "Cascadia Code", sans-serif;
    font-size: 14px;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    min-width: 1000px;
  }
  .order-table th,
  .order-table td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
    vertical-align: top;
  }
  .order-table th {
    background-color: #f1f5f9;
    font-weight: bold;
    color: #1f2937;
  }
  .order-table tbody tr:nth-child(even) {
    background-color: #f9fafb;
  }
  .order-table tbody tr:hover {
    background-color: #e5e7eb;
  }
  .order-table td ul {
    margin: 0;
    padding-left: 18px;
  }
  .clickable-row {
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  .clickable-row:hover {
    background-color: #e5e7eb !important;
  }
</style>
