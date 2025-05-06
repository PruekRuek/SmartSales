<script lang="ts">
    import Menubar from '../../lib/component/menubar.svelte';
    var submit_form = function(){
        if(confirm("คุณต้องการจะส่งข้อมูลใช่ไหม")){
            window.location.href = '/home'; 
        }else{
            console.log('คุณยกเลิกเรียบร้อยแล้ว')
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
                <input type="text" id="name" required>

                <label for="contact">ช่องทางติดต่อ</label>
                <input type="tel" id="contact" name="contact">

                <label for="address">ที่อยู่</label>
                <textarea id="address" name="address" rows="3" required></textarea>

                <label for="product">ชื่อสินค้าที่ซื้อ</label>
                <input type="text" id="product" name="product" required>

                <label for="staff">พนักงาน</label>
                <select id="staff" name="staff" required>
                <option value="">กรุณาเลือกพนักงาน </option>
                <option value="staff1">พนักงาน1</option>
                <option value="staff2">พนักงาน2</option>
                </select><br>

                <button type="submit">ส่งข้อมูล</button>
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

.form_container{
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
    select {
        margin-top: 5px;
        padding : 8px;
        width:250px;
        text-align:center;
        border: 1px solid #ccc;
    }
    button {
      margin-top: 20px;
      margin-bottom: 60px;
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }
    button:hover {
      background-color: #45a049;
    }

</style>