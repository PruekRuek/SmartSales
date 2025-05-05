<script lang="ts">
    import Menubar from '../../lib/component/menubar.svelte';

</script>

<Menubar />
    <main class="main-content">

        <!-- ------------Content----------- -->
        <div class="content">
            
            <div class="filters">
                <div class="search-sorting">
                    <i class="fa-solid fa-magnifying-glass"></i><input type="text" id="searchInput" placeholder="Search" on:input={fetchData()}>
                </div>
            </div>
            
            <table>
            <thead>
                <tr>
                <th on:click={sortTable('ID')}>ID <span class="sort-arrow" id="arrowID">⇅</span></th>
                <th on:click={sortTable('name')}>Name <span class="sort-arrow" id="arrowUsername">⇅</span></th>
                <th on:click={sortTable('email')}>Email <span class="sort-arrow" id="arrowEmail">⇅</span></th>
                <th on:click={sortTable('phone')}>Phone <span class="sort-arrow" id="arrowPhone">⇅</span></th>
                <th on:click={sortTable('client')}>Client <span class="sort-arrow" id="arrowClient">⇅</span></th>
                </tr>
            </thead>
            <tbody id="SalesmanData">
                <tr>
                  <td>1</td><td>Miss Faii</td><td>xxx@gmail.com</td><td>08x-xxx-xxxx</td><td>-</td>
                </tr>
                <tr>
                  <td>2</td><td>Mr. Pruek</td><td>xxx@gmail.com</td><td>08x-xxx-xxxx</td><td>-</td>
                </tr>
                <tr>
                  <td>3</td><td>Miss Smile</td><td>xxx@gmail.com</td><td>08x-xxx-xxxx</td><td>-</td>
                </tr>
                <tr>
                  <td>4</td><td>Miss Plakaow</td><td>xxx@gmail.com</td><td>08x-xxx-xxxx</td><td>-</td>
                </tr>
                <tr>
                  <td>5</td><td>Mr. Teamthai Noisuwanna</td><td>Teamthai.noi@dome.tu.ac.th</td><td>08x-xxx-xxxx</td><td>-</td>
                </tr>
                <tr>
                    <td>5</td><td>Miss Grace</td><td>xxx@gmail.com</td><td>08x-xxx-xxxx</td><td>-</td>
                </tr>
              </tbody>
              
            </table>
        </div>
    </main>
   
 <style>
     @import url('https://fonts.googleapis.com/css2?family=Cascadia+Code:ital,wght@0,200..700;1,200..700&display=swap');
     @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css');
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

   .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    margin: 2% 0 5% 0;
    width: 100%;
    height: 100%;
    /* background: #272727; */
  }

    table, th, td {
    border-collapse: collapse;
    padding: 10px;
    text-align: center;
  }
 
    td {
    border-right: 1px solid rgb(133, 133, 133);
    background: #f7f7f7;
    font-size: 1vw;
  }

    td:last-child {
    border-right: none;
  }
  
    th {
    cursor: pointer;
    position: relative;
    background: #E5E5E5;
    font-size: 1vw;
    }

    th:first-child {
    border-radius: 10px 0 0 0;
    width: 5vw;
  }

  th:nth-child(2) {
    width: 16vw;
  }

  th:nth-child(3) {
    width: 17vw;
  }

  th:nth-child(4) {
    width: 10vw;
  }

  th:last-child {
    border-radius: 0 10px 0 0;
    width: 16vw;
  }
  .arrow {
    font-size: 0.8rem;
    margin-left: 5px;
    opacity: 0.5;
  }
  .active-arrow {
    opacity: 1;
  }

  tr:last-child td:first-child {
    border-radius: 0 0 0 10px;
  }

  tr:last-child td:last-child {
    border-radius: 0 0 10px 0;
  }

  .filters {
    display: flex;
    justify-content: end;
    width: 70%;
    margin-bottom: 2%;
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
  }

  .fa-magnifying-glass {
    color: #4E4E4E;
  }
 </style>