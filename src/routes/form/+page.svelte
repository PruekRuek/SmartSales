<script lang="ts">
  import Menubar from '../../lib/component/menubar.svelte';
  import { onMount } from 'svelte';
  import { userManager } from '$lib/cognito/auth';
  import { goto } from '$app/navigation';

  let loggedInUserName = '';
  let customerName = '';
  let contact = '';
  let address = '';
  let selectedStaff = '';
  let products: { name: string; quantity: number }[] = [];

  onMount(async () => {
    const user = await userManager.getUser();
    if (user) {
      loggedInUserName = user.profile.name ?? '';
      selectedStaff = loggedInUserName;
    }

    // ดึงสินค้าจาก localStorage
    const saved = localStorage.getItem("selectedProducts");
    if (saved) {
      products = JSON.parse(saved);
      localStorage.removeItem("selectedProducts");
    }
  });

  function removeProduct(index: number) {
    products = products.filter((_, i) => i !== index);
    localStorage.setItem("selectedProducts", JSON.stringify(products));
  }


  function increase(index: number) {
    products[index].quantity++;
  }

  function decrease(index: number) {
    if (products[index].quantity > 1) {
      products[index].quantity--;
    }
  }

  function submit_form(event: Event) {
    event.preventDefault();
    if (confirm("คุณต้องการจะส่งข้อมูลใช่ไหม")) {
      console.log({
        customerName,
        contact,
        address,
        selectedStaff,
        products,
      });
      window.location.href = '/home';
    } else {
      console.log('คุณยกเลิกเรียบร้อยแล้ว');
    }
  }
</script>

<Menubar />
<main class="main-content">
  <div class="content">
    <div class="form_container">
      <form on:submit={submit_form}>
        <h2>กรอกข้อมูลลูกค้า</h2>

        <label for="name">ชื่อ-นามสกุล ลูกค้า</label>
        <input type="text" id="name" bind:value={customerName} required />

        <label for="contact">ช่องทางติดต่อ</label>
        <input type="tel" id="contact" bind:value={contact} />

        <label for="address">ที่อยู่</label>
        <textarea id="address" bind:value={address} rows="3" required></textarea>

        <label>รายการสินค้า</label>
        {#each products as product, index}
          <div class="product-row">
            <span class="product-name">{product.name}</span>
            <div class="quantity-controls">
              <button type="button" on:click={() => decrease(index)}>-</button>
              <span>{product.quantity}</span>
              <button type="button" on:click={() => increase(index)}>+</button>
            </div>
            <button class="remove" type="button" on:click={() => removeProduct(index)}>ลบ</button>
          </div>
        {/each}

        <button type="button" on:click={() => goto('/product-list')}>เพิ่มสินค้า</button>

        <label for="staff">พนักงาน</label>
        <input type="text" id="staff" value={loggedInUserName} readonly class="readonly-input" />

        <div class="submit-container">
          <button type="submit">ส่งข้อมูล</button>
        </div>
      </form>
    </div>
  </div>
</main>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Cascadia+Code:ital,wght@0,200..700;1,200..700&display=swap');

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

  .form_container {
    background-color: #FFFFFF;
    padding: 20px;
    border-radius: 8px;
    max-width: 750px;
    margin: auto;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }

  form {
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    margin: 0 auto;
  }

  label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
  }

  input, textarea {
    width: 96.4%;
    padding: 8px;
    margin-top: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-family: 'Cascadia Code', monospace;
  }

  .readonly-input {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
  }

  .submit-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }

  button {
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 10px 20px;
    background-color: #567C8D;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: .1s ease-in-out;
  }

  button:hover {
    background-color: #304954;
  }

  .product-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 6px 0;
    justify-content: space-between;
  }

  .product-name {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .quantity-controls {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .quantity-controls span {
    min-width: 24px;
    text-align: center;
    display: inline-block;
  }

  .quantity-controls button {
    padding: 4px 10px;
    font-size: 14px;
    background-color: #aaa;
    border-radius: 4px;
    border: none;
    color: white;
  }

  .remove {
    background-color: #b94a48;
  }

  .remove:hover {
    background-color: #962d2a;
  }
</style>
