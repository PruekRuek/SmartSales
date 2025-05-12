<script lang="ts">
  import Menubar from '../../lib/component/menubar.svelte';
  import { onMount } from 'svelte';

  // ข้อมูลต้นฉบับ
  const originalData: [string, string, string, string, string][] = [
    ["1", "Miss Faii", "xxx@gmail.com", "08x-xxx-xxxx", "-"],
    ["2", "Mr. Pruek", "xxx@gmail.com", "08x-xxx-xxxx", "-"],
    ["3", "Miss Smile", "xxx@gmail.com", "08x-xxx-xxxx", "-"],
    ["4", "Miss Plakaow", "xxx@gmail.com", "08x-xxx-xxxx", "-"],
    ["5", "Mr. Teamthai Noisuwanna", "Teamthai.noi@dome.tu.ac.th", "08x-xxx-xxxx", "-"],
    ["6", "Miss Grace", "xxx@gmail.com", "08x-xxx-xxxx", "-"],
  ];

  let searchTerm = '';
  let sortColumn = '';
  let sortOrder: 'asc' | 'desc' = 'asc';

  // ฟังก์ชันสลับลำดับ
  function sortTable(column: string) {
    if (sortColumn === column) {
      sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn = column;
      sortOrder = 'asc';
    }
  }

  // สร้างข้อมูลที่ผ่านการ filter + sort
  $: filteredData = originalData
    .filter(row => row.join(' ').toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (!sortColumn) return 0;
      const columnIndex = {
        ID: 0,
        name: 1,
        email: 2,
        phone: 3,
        client: 4
      }[sortColumn];
      const valA = a[columnIndex];
      const valB = b[columnIndex];
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  function getArrow(col: string) {
    if (sortColumn !== col) return '⇅';
    return sortOrder === 'asc' ? '↑' : '↓';
  }
</script>

<Menubar />
<main class="main-content">
  <div class="content">
    <div class="filters">
      <div class="search-sorting">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          bind:value={searchTerm}
          placeholder="Search"
        />
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th on:click={() => sortTable('ID')}>ID <span class="sort-arrow">{getArrow('ID')}</span></th>
          <th on:click={() => sortTable('name')}>Name <span class="sort-arrow">{getArrow('name')}</span></th>
          <th on:click={() => sortTable('email')}>Email <span class="sort-arrow">{getArrow('email')}</span></th>
          <th on:click={() => sortTable('phone')}>Phone <span class="sort-arrow">{getArrow('phone')}</span></th>
          <th on:click={() => sortTable('client')}>Client <span class="sort-arrow">{getArrow('client')}</span></th>
        </tr>
      </thead>
      <tbody>
        {#each filteredData as row}
          <tr>
            {#each row as cell}
              <td>{cell}</td>
            {/each}
          </tr>
        {/each}
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