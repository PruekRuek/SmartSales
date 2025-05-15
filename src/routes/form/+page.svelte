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
  let products: { productId: string; name: string; quantity: number; categoryId: string }[] = [];
  let errorMessage: string = '';

  function showError(msg: string) {
    errorMessage = msg;
    setTimeout(() => errorMessage = '', 5000);
  }

  onMount(async () => {
    const user = await userManager.getUser();
    if (user) {
      loggedInUserName = user.profile.name ?? '';
      selectedStaff = loggedInUserName;
    }

    const saved = localStorage.getItem("selectedProducts");
    if (saved) {
      const parsed = JSON.parse(saved);
      products = parsed.map((p: any) => ({
        productId: p.productId,
        name: p.name,
        quantity: p.quantity,
        categoryId: p.categoryId ?? ''
      }));
      localStorage.removeItem("selectedProducts");
    }

    const formSaved = localStorage.getItem("formData");
    if (formSaved) {
      const data = JSON.parse(formSaved);
      customerName = data.customerName ?? '';
      contact = data.contact ?? '';
      address = data.address ?? '';
      localStorage.removeItem("formData");
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

  function goToProductList() {
    localStorage.setItem("formData", JSON.stringify({
      customerName,
      contact,
      address
    }));
    goto('/product-list');
  }

  async function submit_form(event: Event) {
    event.preventDefault();

    if (
      customerName.trim() === '' ||
      contact.trim() === '' ||
      address.trim() === '' ||
      products.length === 0
    ) {
      showError([
        "❌ ไม่สามารถส่งข้อมูลได้ เนื่องจาก:",
        customerName.trim() === '' ? "- ชื่อลูกค้าไม่ครบ" : '',
        contact.trim() === '' ? "- ช่องทางติดต่อไม่ครบ" : '',
        address.trim() === '' ? "- ที่อยู่ไม่ครบ" : '',
        products.length === 0 ? "- ยังไม่ได้เลือกสินค้า" : ''
      ].filter(Boolean).join("\n"));
      return;
    }

    for (const product of products) {
      if (!product.categoryId) {
        showError(`❌ ไม่พบ categoryId ของสินค้า "${product.name}" (ID: ${product.productId}) กรุณากลับไปเลือกสินค้าใหม่`);
        return;
      }
    }

    if (!confirm("คุณต้องการจะส่งข้อมูลใช่ไหม")) return;

    const payload = {
      customerName,
      contact,
      address,
      selectedStaff,
      submittedAt: new Date().toISOString(),
      products: products.map(p => ({
        productId: p.productId,
        name: p.name,
        quantity: p.quantity,
        categoryId: p.categoryId
      }))
    };

    try {
      const res = await fetch('https://l6xfm55xkf.execute-api.us-east-1.amazonaws.com/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("✅ ส่งข้อมูลสำเร็จ");
        goto('/home');
      } else {
        const error = await res.json();
        showError(`❌ เกิดข้อผิดพลาด: ${error.error}`);
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      showError("❌ ไม่สามารถติดต่อเซิร์ฟเวอร์ได้\nโปรดลองใหม่ภายหลัง");
    }
  }
</script>


<Menubar />
<main class="main-content">
  <div class="content">
    {#if errorMessage}
      <div class="alert">{errorMessage}</div>
    {/if}
    <div class="form_container">
      <form on:submit={submit_form}>
        <h2>กรอกข้อมูลลูกค้า</h2>

        <label for="name">ชื่อ-นามสกุล ลูกค้า</label>
        <input type="text" id="name" bind:value={customerName} required />

        <label for="contact">ช่องทางติดต่อ</label>
        <input type="tel" id="contact" bind:value={contact} required />

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

        <button type="button" on:click={goToProductList}>เพิ่มสินค้า</button>

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

  .alert {
    background-color: #fdecea;
    color: #b91c1c;
    border: 1px solid #fca5a5;
    padding: 10px 15px;
    margin-bottom: 20px;
    border-radius: 6px;
    font-weight: bold;
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