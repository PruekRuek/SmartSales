<script lang="ts">
  import Menubar from '../../lib/component/menubar.svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';

  let products: any[] = [];
  let filtered: any[] = [];
  let searchTerm: string = '';

  // ฟังก์ชันสำหรับการดึงข้อมูล
  onMount(async () => {
    const res = await fetch('https://jn4h73y1ml.execute-api.us-east-1.amazonaws.com/products');
    const data = await res.json();
    products = data;

    const categoryId = get(page).url.searchParams.get('category');
    filterProducts(categoryId, searchTerm);
  });

  // ฟังก์ชันกรองข้อมูลทั้งจาก category และ search term
  function filterProducts(categoryId: string | null, search: string) {
    let temp = categoryId
      ? products.filter(p => p.categoryId === categoryId)
      : [...products];

    if (search.trim() !== '') {
      const lowerSearch = search.toLowerCase();
      temp = temp.filter(p =>
        p.name.toLowerCase().includes(lowerSearch) ||
        p.productId.toLowerCase().includes(lowerSearch)
      );
    }

    filtered = temp;
  }

  // เรียกทุกครั้งที่ searchTerm เปลี่ยน
  $: filterProducts(get(page).url.searchParams.get('category'), searchTerm);
</script>

<Menubar />

<main class="main-content">
  <div class="content">
    <div class="search-section">
      <div class="search-sorting">
        <input
          type="text"
          placeholder="Search"
          bind:value={searchTerm}
        />
      </div>
    </div>
  

    <div class="object-grid">
      {#each filtered as product}
        <div class="object-card">
          <a href={`/information?id=${product.productId}`}>
            <img src={product.imageUrl} alt={product.name} />
            <div class="card-title">{product.name}</div>
            {#if product.quantity === 0}
              <div class="Available_count out-of-stock">Out of Stock</div>
            {:else}
              <div class="Available_count in-stock">Available : {product.quantity}</div>
            {/if}
          </a>
        </div>
      {/each}
    </div>
  </div>
</main>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Cascadia+Code:ital,wght@0,200..700;1,200..700&display=swap');

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-family: 'Cascadia Code', sans-serif;
  }

  .content {
    flex: 1;
    padding: 20px;
  }

  .search-section {
    display: flex;
    justify-content: flex-end;
    padding-right: 5%;
    margin-top: 20px;
    margin-bottom: 50px;  
  }

  .search-sorting {
    height: 15px;
    display: flex;
    padding: 10px 20px;
    border-radius: 30px;
    border: 1px solid rgb(100, 100, 100);
    align-items: center;
    background: white;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.158);
  }

  .search-sorting input {
    width: 20vw;
    padding-left: 7%;
    outline: none;
    border: none;
    font-weight: 700;
    background: transparent;
    font-family: 'Cascadia Code', sans-serif;
    font-size: 1rem;
  }

    .search-sorting input::placeholder {
    font-family: Arial, sans-serif;
    font-weight: 700;
    font-size: 1rem;
    color: #999; /* ปรับสีได้ตามต้องการ */
  }

  .object-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    row-gap: 30px;
    justify-items: center;
    margin: 0 90px;
  }

  .object-card {
    background-color: #ffffff;
    padding: 15px;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 230px;
    height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-sizing: border-box;
    transition: transform 0.2s ease-in-out;
  }

  .object-card:hover {
    transform: translateY(-3px);
  }

  .object-card img {
    max-width: 100%;
    max-height: 100px;
    object-fit: contain;
  }

  .card-title {
    font-weight: bold;
    text-align: center;
    color: #333;
    font-size: 15px;
    font-family: 'Cascadia Code', sans-serif;
  }

  .Available_count {
    text-align: center;
    font-size: 12px;
    font-family: 'Cascadia Code', sans-serif;
  }

  .in-stock {
    color: green;
  }

  .out-of-stock {
    color: red;
  }

  a {
    text-decoration: none;
  }
</style>
