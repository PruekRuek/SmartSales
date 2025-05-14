<script lang="ts">
  import Menubar from '../../lib/component/menubar.svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';

  let products: any[] = [];
  let filtered: any[] = [];
  let searchTerm: string = '';
  let selectedItems: { name: string; quantity: number }[] = [];

  onMount(async () => {
    const res = await fetch('https://jn4h73y1ml.execute-api.us-east-1.amazonaws.com/products');
    const data = await res.json();
    products = data;

    const categoryId = get(page).url.searchParams.get('category');
    filterProducts(categoryId, searchTerm);

    const stored = localStorage.getItem("selectedProducts");
    selectedItems = stored ? JSON.parse(stored) : [];
  });

  function saveSelectedItems() {
    localStorage.setItem("selectedProducts", JSON.stringify(selectedItems));
  }

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

  function toggleProduct(name: string) {
    const index = selectedItems.findIndex(item => item.name === name);
    if (index !== -1) {
      selectedItems.splice(index, 1);
    } else {
      selectedItems.push({ name, quantity: 1 });
    }
    selectedItems = [...selectedItems]; // trigger reactivity
    saveSelectedItems();
  }

  function isSelected(name: string) {
    return selectedItems.some(item => item.name === name);
  }

  function confirmSelection() {
    saveSelectedItems();
    goto("/form");
  }

  function increaseQuantity(name: string) {
    const product = selectedItems.find(p => p.name === name);
    const productInfo = products.find(p => p.name === name); // หาข้อมูลสินค้าจาก stock

    if (product && productInfo) {
        if (product.quantity < productInfo.quantity) {
        product.quantity++;
        selectedItems = [...selectedItems]; // trigger update
        saveSelectedItems();
        }
    }
    }


  function decreaseQuantity(name: string) {
    const product = selectedItems.find(p => p.name === name);
    if (product && product.quantity > 1) {
      product.quantity--;
      selectedItems = [...selectedItems]; // trigger reactivity
      saveSelectedItems();
    }
  }

  $: filterProducts(get(page).url.searchParams.get('category'), searchTerm);
</script>

<Menubar />

<main class="main-content">
  <div class="content">
    <div class="search-section">
      <div class="search-bar">
        <input type="text" placeholder="Search" bind:value={searchTerm} />
      </div>
    </div>

    <div class="object-grid">
      {#each filtered as product}
        <div class="object-card">
          <img src={product.imageUrl} alt={product.name} />
          <div class="card-title">{product.name}</div>

          <div class="Available_count {product.quantity === 0 ? 'out-of-stock' : 'in-stock'}">
            {product.quantity === 0 ? 'Out of Stock' : `Available: ${product.quantity}`}
          </div>

          <div class="card-footer">
            <button
              on:click={() => toggleProduct(product.name)}
              disabled={product.quantity === 0}
              title={product.quantity === 0 ? 'สินค้าหมด' : ''}
            >
              {isSelected(product.name) ? "✔ เลือกแล้ว" : "เพิ่มสินค้า"}
            </button>

            {#if isSelected(product.name) && product.quantity > 0}
              <div class="qty-controller">
                <button on:click={() => decreaseQuantity(product.name)}>-</button>
                <span>{selectedItems.find(p => p.name === product.name)?.quantity}</span>
                <button on:click={() => increaseQuantity(product.name)}>+</button>
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>

    {#if selectedItems.length > 0}
      <div class="floating-confirm">
        <button class="big-confirm-button" on:click={confirmSelection}>ยืนยันการเลือกสินค้า</button>
      </div>
    {/if}
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
    justify-content: right;
    margin-bottom: 20px;
    padding: 10px;
  }

  .search-bar input {
    width: 450px;
    padding: 10px 20px;
    font-size: 20px;
    border-radius: 25px;
    border: 1px solid #ccc;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    outline: none;
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
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
    margin-top: auto;
  }

  .Available_count {
    text-align: center;
    font-size: 12px;
  }

  .in-stock {
    color: green;
  }

  .out-of-stock {
    color: red;
  }

  .card-footer {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: auto;
    width: 100%;
    align-items: center;
  }

  button {
    padding: 6px 12px;
    font-size: 14px;
    border: none;
    border-radius: 6px;
    background-color: #567C8D;
    color: white;
    cursor: pointer;
    transition: .3s ease-in-out;
  }

  button:hover {
    background-color: #2e454f;
  }

  button:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
  }

  .qty-controller {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .qty-controller button {
    padding: 4px 10px;
    font-size: 16px;
  }

  .floating-confirm {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 1000;
  }

  .big-confirm-button {
    padding: 24px 40px;
    font-size: 20px;
    font-weight: bold;
    border-radius: 16px;
  }
</style>
