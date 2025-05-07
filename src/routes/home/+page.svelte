<script lang="ts">
    import Menubar from '../../lib/component/menubar.svelte';
</script>

<Menubar />
<main class="main-content">
    <div class="content">
        <div class="category-grid">

            <div class="category-card">
                <a href="/product" >
                <img src="src/lib/images/product/Electronics.png" alt="Electronics">
                <div class="card-title">Electronics</div></a>
            </div>

            <div class="category-card">
                <a href="/product">
                <img src="src/lib/images/product/Electrical Appliances.png" alt="Electrical Appliances">
                <div class="card-title">Electrical Appliances</div></a>
            </div>

            <div class="category-card">
                <a href="/product" >
                <img src="src/lib/images/product/Construction Materials.png" alt="Construction Materials">
                <div class="card-title">Construction Materials</div></a>
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
    padding: 60px;
  }


.category-grid {
    display: flex;
    flex-wrap: wrap;
    column-gap: 80px; /* ซ้าย-ขวา */
    row-gap: 40px;    /* บน-ล่าง */
    justify-content: center; /* จัดให้อยู่กลางแนวนอน */
    margin: 0 auto;
}

.category-card {
  margin-bottom: 5px;
  margin-top: 5px;
  background-color: #Ffffff;
  padding: 10px 10px; /* เพิ่ม padding */
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 5px 10px rgba(0,0,0,0.2);
  width: 100%;
  max-width: 280px;
  height: 200px; /* กำหนดความสูงแน่นอนเพื่อจัดกึ่งกลางได้ง่าย */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
}

.category-card a {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column; /* <<< วางรูป + ข้อความแนวตั้ง */
  align-items: center; /* <<< จัดให้อยู่กลางแกนขวาง */
  justify-content: flex-start; /* ขยับขึ้น */
  width: 100%;
  height: 100%;
  gap: 10px;
  padding-top: 20px;
}



.category-card:hover {
    transform: translateY(-5px);
}

.category-card img {
    width: 60%;
    height: 60%;
    object-fit: contain;
    margin-bottom:5px;
}

.card-title {
    text-align: center;
    color: #333;
    font-size: 18px;
    font-family: "Cascadia Code", sans-serif;
}
</style>