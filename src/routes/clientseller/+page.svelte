<script>
    import Menubar from '../../lib/component/menubar.svelte';
    import boy1 from '../../lib/images/seller/boy2.PNG'
    import girl1 from '../../lib/images/seller/girl1.PNG'
    import girl2 from '../../lib/images/seller/girl2.PNG'

    let selectedSeller = null;

    const sellers = [
        {
            firstName: "สมชาย",
            lastName: "ใจดี",
            position: "พนักงานขาย",
            phone: "098-765-4321",
            email: "somchai@example.com",
            image: boy1
        },
        {
            firstName: "สมหญิง",
            lastName: "ตั้งใจดี",
            position: "พนักงานขาย",
            phone: "092-345-6789",
            email: "somying@example.com",
            image: girl2
        },
        {
            firstName: "เจนจิรา",
            lastName: "หวังดี",
            position: "พนักงานขาย",
            phone: "089-123-4567",
            email: "jenjira@example.com",
            image: girl1
        }
    ];
</script>

<Menubar />

<!-- Search Bar -->
<div class="search-bar">
    <div class="search-input-wrapper">
        <span class="search-icon">🔍</span>
        <input type="text" placeholder="Search name here" />
    </div>
</div>

<main class="main-content">
    <div class="content">
        <!-- Seller Section -->
        <section class="seller-section">
            <h2 class="section-title">Seller</h2>
            <div class="seller-list">
                {#each sellers as seller}
                    <div class="seller-box" on:click={() => selectedSeller = seller}>
                        <div class="seller-image-wrapper">
                            <img src={seller.image} alt="seller cartoon" class="seller-image" />
                        </div>
                        <div class="seller-info">
                            <h3 class="seller-name">{seller.firstName} {seller.lastName}</h3>
                            <p class="seller-position">{seller.position}</p>
                            <p class="seller-phone">📞 {seller.phone}</p>
                            <p class="seller-email">📧 {seller.email}</p>
                        </div>
                        <button class="view-customers-btn" on:click={() => window.location.href = '/customers'}>
                            ลูกค้าที่ดูแล
                        </button>
                        
                    </div>
                {/each}
            </div>
        </section>
    </div>
</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Cascadia+Code:ital,wght@0,200..700;1,200..700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

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

    /* Search Bar */
    
    .search-bar {
        display: flex;
        justify-content: flex-end;
        padding: 20px 60px 0 30px;
        margin-top: 30px;
    }

    .search-input-wrapper {
        position: relative;
        width: 340px;
    }

    .search-icon {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 16px;
        color: #888;
    }

    .search-input-wrapper input {
        width: 100%;
        padding: 12px 16px 12px 36px;
        font-size: 15px;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-sizing: border-box;
    }

    /* Seller Section */
    .seller-section {
        margin-top: 20px;
    }

    .section-title {
        font-size: 40px;
        font-weight: 700;
        color: #333;
        margin-bottom: 60px;
        margin-top: -10px;
        text-align: left; 
        border-left: 6px solid #4CAF50;
        padding-left: 12px;
    }

    .seller-list {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
    }

    .seller-box {
        display: flex;
        align-items: center;
        width: 600px;
        height: 180px;
        background-color: #f8f8f8;
        border-radius: 16px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        padding: 20px;
        cursor: pointer;
        transition: transform 0.2s ease;
        position: relative;
        justify-content: flex-start;
    }

    .seller-box:hover {
        transform: translateY(-6px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    }

    .seller-image-wrapper {
        width: 120px;
        height: 120px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .seller-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
    }

    .seller-info {
        flex-grow: 1;
        padding-left: 50px;
    }

    .seller-name {
        font-size: 22px;
        font-weight: 700;
        color: #333;
        margin-bottom: 10px;
    }

    .seller-position, .seller-phone, .seller-email {
        font-size: 16px;
        color: #777;
        margin: 5px 0;
    }

    .view-customers-btn {
        position: absolute;
        bottom: 10px;
        right: 16px;
        background-color: #4CAF50;
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s;
    }

    .view-customers-btn:hover {
        background-color: #45a049;
    }
</style>
