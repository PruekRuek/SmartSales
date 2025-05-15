<script lang="ts">
  import Menubar from '../../lib/component/menubar.svelte';
  import { onMount } from 'svelte';
  import { userManager } from '$lib/cognito/auth';

  let customerOrders: any[] = [];
  let searchTerm: string = '';
  let staffName: string = '';

    onMount(async () => {
    try {
        const user = await userManager.getUser();
        if (user) {
        staffName = user.profile.name ?? '';
        const res = await fetch('https://yhnn87nc5l.execute-api.us-east-1.amazonaws.com/orders');
        const allOrders = await res.json();
        customerOrders = allOrders.filter(order => order.staff === staffName);
        }
    } catch (err) {
        console.error("❌ Failed to fetch customer orders:", err);
    }
    });

</script>

<Menubar />

<main class="main-content">
  <div class="content">
    <div class="filters">
      <div class="search-sorting">
        <input type="text" placeholder="ค้นหาชื่อลูกค้า" bind:value={searchTerm} />
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>ชื่อลูกค้า</th>
          <th>ที่อยู่</th>
          <th>เบอร์ติดต่อ</th>
          <th>สินค้า</th>
        </tr>
      </thead>
      <tbody>
        {#each customerOrders.filter(order => order.customerName.toLowerCase().includes(searchTerm.toLowerCase())) as order, index}
          <tr>
            <td>{index + 1}</td>
            <td>{order.customerName}</td>
            <td>{order.address}</td>
            <td>{order.contact}</td>
            <td>
              <ul>
                {#each JSON.parse(order.products) as product}
                  <li>{product.name} จำนวน {product.quantity}</li>
                {/each}
              </ul>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</main>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Cascadia+Code:ital,wght@0,200..700;1,200..700&display=swap');

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-family: "Cascadia Code", sans-serif;
    background: #f8f3f0;
    padding: 60px 20px;
  }

  .content {
    max-width: 1000px;
    margin: 0 auto;
    width: 100%;
  }

  .filters {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }

  .search-sorting {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    border-radius: 30px;
    border: 1px solid #aaa;
    background: white;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  }

  .search-sorting input {
    border: none;
    outline: none;
    background: transparent;
    font-weight: bold;
    font-size: 16px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  th, td {
    padding: 12px 16px;
    border: 1px solid #ddd;
    text-align: left;
    font-size: 14px;
  }

  th {
    background-color: #f1f5f9;
    font-weight: 600;
  }

  td ul {
    padding-left: 18px;
    margin: 0;
  }
</style>