<script lang="ts">
    import Menubar from '../../lib/component/menubar.svelte';
</script>

<Menubar />
<main class="main-content">
    <div class="content">
        <div class="search-section">
            <div class="search-bar">
                <input type="text" placeholder="Search">
            </div>
        </div>
        
        <div class="object-grid">
            
                <div class="object-card">
                    <a href="information">
                        <img src="src/lib/images/product/laptop.png" alt="Laptop">
                        <div class="card-title">Laptop</div>
                        <div class="Available_count">Available : 12</div>
                    </a>
                </div>
            
            <div class="object-card">
                <img src="src/lib/images/product/Wireless keyboard and mouse set.png" alt="Wireless keyboard">
                <div class="card-title">Wireless keyboard and mouse</div>
                <div class="Available_count">Available : 10</div>
            </div>
            <div class="object-card">
                <img src="src/lib/images/product/speaker.png" alt="Bluetooth speaker">
                <div class="card-title">Bluetooth speaker</div>
                <div class="Available_count">Available : 10</div>
            </div>
            <div class="object-card">
                <img src="src/lib/images/product/mornitor.png" alt="Mornitor">
                <div class="card-title">Mornitor</div>
                <div class="Available_count">Available : 10</div>
            </div>
            <div class="object-card">
                <img src="src/lib/images/product/CCTY Camera.png" alt="CCTY Camera">
                <div class="card-title">CCTY Camera</div>
                <div class="Available_count">Available : 10</div>
            </div>
            <div class="object-card">
                <img src="src/lib/images/product/CCTY Camera.png" alt="CCTY Camera">
                <div class="card-title">CCTY Camera</div>
                <div class="Available_count">Available : 10</div>
            </div>
        </div>
        
    </div>
</main>
  
<style>
    @import url('https://fonts.googleapis.com/css2?family=Cascadia+Code:ital,wght@0,200..700;1,200..700&display=swap');

    @keyframes change{
        0% {
            background-color: #F5F1EB;
        }
        51% {
            background-color: #FFFFFF;
        }
        100% {
            background-color: #F5F1EB;
        }
    }

    .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-family: "Cascadia Code", sans-serif;
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
    font-family: "Cascadia Code", sans-serif;
}

.search-bar input {
    width: 450px;
    padding: 10px 20px;
    font-size: 20px;
    border-radius: 25px;
    border: 1px solid #ccc;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    outline: none;
    font-family: "Cascadia Code", sans-serif;
}

.object-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    row-gap: 30px;    /* บน-ล่าง */
    justify-items: center;
    margin: 0 90px;
}

.object-card {
  background-color: #ffffff;
  padding: 15px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 5px 10px rgba(0,0,0,0.2);
  width: 100%;
  max-width: 230px;
  height: 180px; /* ✅ กำหนดความสูงคงที่ */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-sizing: border-box; /* ป้องกัน overflow จาก padding */
}



.object-card:hover {
    transform: translateY(-3px);
}

.object-card img {
  max-width: 100%;
  max-height: 100px; /* ✅ จำกัดขนาด */
  object-fit: contain;
}


.card-title {
    font-weight: bold;
    text-align: center;
    color: #333;
    font-size: 15px;
    font-family: "Cascadia Code", sans-serif;
}

.card-title-Add{
  font-weight: bold;
  text-align: center;
  color: rgb(101, 99, 99);
  font-size: 15px;
}

  .Available_count {
    text-align: center;
    color: green;
    font-size: 12px;
    font-family: "Cascadia Code", sans-serif;
}

a{
    text-decoration: none;
}

</style>