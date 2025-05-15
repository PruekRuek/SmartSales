<script lang="ts">
  import Menubar from '../../lib/component/menubar.svelte';
  import { onMount } from 'svelte';

  let customerOrders: any[] = [];
  let searchTerm: string = '';

  onMount(async () => {
    try {
      const res = await fetch('https://yhnn87nc5l.execute-api.us-east-1.amazonaws.com/orders');
      customerOrders = await res.json();
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

    {#each customerOrders.filter(order => order.customerName.toLowerCase().includes(searchTerm.toLowerCase())) as order}
      <div class="product-card">
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
          </div>
        </div>
      </div>
    {/each}
  </div>
</main>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Cascadia+Code:ital,wght@0,200..700;1,200..700&display=swap');

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
