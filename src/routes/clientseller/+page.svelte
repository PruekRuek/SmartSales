<script lang="ts">
  import { onMount } from 'svelte';
  import Menubar from '../../lib/component/menubar.svelte';

  let selectedSeller = null;
  let users: { name: string; email: string; phone: string }[] = [];
  let filteredUsers: typeof users = [];
  let searchTerm: string = '';

  onMount(async () => {
    try {
      const res = await fetch("https://80u4b8s9gk.execute-api.us-east-1.amazonaws.com/Seller");
      users = await res.json();
      filteredUsers = users;
    } catch (err) {
      console.error("❌ Failed to fetch users:", err);
    }
  });

  function filterUsers(search: string) {
    const lower = search.toLowerCase().trim();
    filteredUsers = lower === ''
      ? users
      : users.filter(user =>
          user.name.toLowerCase().includes(lower) ||
          user.email.toLowerCase().includes(lower) ||
          user.phone.includes(lower)
        );
  }

  $: filterUsers(searchTerm);
</script>

<Menubar />

<main class="main-content">
  <div class="content">

    <!-- ✅ ปรับตำแหน่งปุ่มค้นหาไว้ใน content -->
    <div class="filters">
      <div class="search-sorting">
        <input type="text" placeholder="ค้นหาผู้ขาย" bind:value={searchTerm} />
      </div>
    </div>

    <section class="seller-section">
      <h2 class="section-title">รายชื่อผู้ขายทั้งหมด</h2>

      <div class="seller-grid">
        {#each filteredUsers as seller}
          <div class="seller-box" on:click={() => selectedSeller = seller}>
            <div class="seller-info">
              <h3 class="seller-name single-line">{seller.name}</h3>
              <p class="seller-phone">📞 {seller.phone}</p>
              <p class="seller-email">📧 {seller.email}</p>
            </div>
          </div>
        {/each}
      </div>
    </section>
  </div>
</main>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Cascadia+Code&family=Roboto:wght@400;700&display=swap');

  .main-content {
    flex: 1;
    font-family: 'Roboto', sans-serif;
    min-height: 100vh;
    background-color: #f7f0eb;
  }

  .content {
    padding: 40px 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .filters {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 20px;
  }

  .search-sorting {
    display: flex;
    padding: 12px 20px;
    border-radius: 30px;
    border: 1px solid #ccc;
    background: #fff;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  }

  .search-sorting input {
    width: 250px;
    border: none;
    outline: none;
    font-size: 16px;
    background: transparent;
  }

  .seller-section {
    width: 100%;
  }

  .section-title {
    font-size: 28px;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 30px;
    align-self: flex-start;
  }

  .seller-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
    width: 100%;
  }

  .seller-box {
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .seller-box:hover {
    transform: translateY(-4px);
  }

  .seller-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .seller-name {
    font-size: 20px;
    font-weight: bold;
    color: #34495e;
  }

  .single-line {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .seller-phone, .seller-email {
    font-size: 15px;
    color: #666;
  }
</style>
