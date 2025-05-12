<script lang="ts">
  import Menubar from '../../lib/component/menubar.svelte';
  import { onMount, tick } from 'svelte';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';

  let product: any = null;
  let pdfContentRef: HTMLElement;
  let isGeneratingPDF = false;

  onMount(async () => {
    const productId = get(page).url.searchParams.get('id');
    if (!productId) return;

    const res = await fetch(`https://jn4h73y1ml.execute-api.us-east-1.amazonaws.com/product`);
    if (res.ok) {
      const data = await res.json();
      product = data.find((p: any) => p.productId === productId);
    }
  });

  async function exportPDF() {
    isGeneratingPDF = true;
    await tick(); // รอ DOM อัปเดตซ่อนรูปภาพ
    // @ts-ignore: html2pdf มาจาก CDN
    html2pdf().from(pdfContentRef).set({
      filename: `${product?.name || 'product'}.pdf`,
      html2canvas: { useCORS: true, scale: 2 }
    }).save().then(() => {
      isGeneratingPDF = false;
    });
  }
</script>

<Menubar />

<main>
  {#if product}
    <div class="product-container" bind:this={pdfContentRef}>
      
      {#if !isGeneratingPDF}
        <!-- แสดงเฉพาะบนเว็บ -->
        <div class="image-section">
          <div class="image-box">
            <img src={product.imageUrl} alt={product.name} class="product-image" />
          </div>
        </div>
      {/if}

      <div class="detail-section">
        <h1 class="product-name">{product.name}</h1>
        <p class="product-price">{product.price} Baht</p>
        <p class="stock-text">Stock: {product.quantity}</p>
        <p class="product-description">model: {product.info?.model || 'ไม่มีข้อมูลเพิ่มเติม'}</p>
        <p class="product-description">type: {product.info?.type || 'ไม่มีข้อมูลเพิ่มเติม'}</p>
        <p class="product-description">warranty: {product.info?.warranty || 'ไม่มีข้อมูลเพิ่มเติม'}</p>
      </div>
    </div>

    <button class="pdf-button" on:click={exportPDF}>ดาวน์โหลด PDF</button>
  {:else}
    <p>Loading product...</p>
  {/if}
</main>

<style>
  main {
    padding: 20px;
    font-family: 'Cascadia Code', sans-serif;
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
    justify-content: center;
    align-items: center;
    border: 1px solid #aaa;
    border-radius: 5px;
    margin-bottom: 10px;
    overflow: hidden;
  }

  .product-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
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

  .product-description,
  .stock-text {
    font-size: 14px;
    color: #555;
  }

  .pdf-button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #0077cc;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
</style>
