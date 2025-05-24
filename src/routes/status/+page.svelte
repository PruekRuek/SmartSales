<script lang="ts">
  import Menubar from '../../lib/component/menubar.svelte';
</script>

<Menubar />

<main class="page">
  <div class="wrapper">
    <!-- Card 1 -->
    <a href="/tracksales" class="link">
    <button class="card">
      <img src="/images/sales_status.png" alt="ติดตามสถานะการขาย" class="icon" />
      <p>ติดตามสถานะการขาย</p>
    </button>
    </a>

    <!-- Card 2 -->
    <a href="/clientseller" class="link">
    <button class="card">
      <img src="/images/sales_customer.png" alt="เช็คประวัติลูกค้า" class="icon" />
      <p>เซลล์ประจำลูกค้า</p>
    </button>
  </div>
</main>

<style>
  /* ===== Layout ===== */
  .page {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    padding-top: 96px;
    padding-bottom: 2rem;
  }

  .wrapper {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    width: 100%;
    max-width: 800px;
    padding: 0 1rem;
    align-items: start;
  }

  /* ===== Card ===== */
  .card {
    background: #ffffff;
    border-radius: 1rem;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.07);
    padding: 3rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
    width: 100%;
    transition: all 0.25s ease-in-out;
    cursor: pointer;
    border: none;
  }

  .card:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px) scale(1.03);
  }

  /* ===== Icon ===== */
  .icon {
    width: 72px;
    height: 72px;
    object-fit: contain;
  }

  /* ===== Text ===== */
  p {
    font-size: 1.05rem;
    font-weight: 600;
    color: #374151; /* slate-700 */
    margin: 0;
    text-align: center;
  }

  a{
    text-decoration: none;
  }
</style>
