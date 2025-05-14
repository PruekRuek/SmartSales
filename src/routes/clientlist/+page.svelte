<script lang="ts">
    import Menubar from '../../lib/component/menubar.svelte';

    // ข้อมูลที่จะแสดงในตาราง
    let searchTerm = '';
    let rows = [
        { id: 1, name: 'Miss Faii', address: '-', phone: '08x-xxx-xxxx', status: '-', date: '-' },
        { id: 2, name: 'Mr. Pruek', address: '-', phone: '08x-xxx-xxxx', status: '-', date: '-' },
        { id: 3, name: 'Miss Smile', address: '-', phone: '08x-xxx-xxxx', status: '-', date: '-' },
        { id: 4, name: 'Miss Plakaow', address: '-', phone: '08x-xxx-xxxx', status: '-', date: '-' },
        { id: 5, name: 'Mr. Teamthai Noisuwanna', address: '-', phone: '08x-xxx-xxxx', status: '-', date: '-' },
        { id: 6, name: 'Miss Grace', address: '-', phone: '08x-xxx-xxxx', status: '-', date: '-' },
    ];

    let filteredRows = rows;

    // ฟังก์ชันสำหรับกรองข้อมูลตาม searchTerm
    $: filteredRows = searchTerm.trim()
        ? rows.filter(row =>
            Object.values(row).some(value =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        : rows;
</script>

<Menubar />

<main class="main-content">
    <!-- ------------Content----------- -->
    <div class="content">
        <!-- Search Bar -->
        <div class="filters">
            <div class="search-sorting">
                <input
                    type="text"
                    id="searchInput"
                    placeholder="Search"
                    bind:value={searchTerm}
                />
            </div>
        </div>
        
        <!-- Table -->
        <table>
            <thead>
                <tr>
                    <th on:click={sortTable('ID')}>ID <span class="sort-arrow" id="arrowID">⇅</span></th>
                    <th on:click={sortTable('name')}>Name <span class="sort-arrow" id="arrowUsername">⇅</span></th>
                    <th on:click={sortTable('email')}>Address <span class="sort-arrow" id="arrowEmail">⇅</span></th>
                    <th on:click={sortTable('phone')}>Phone <span class="sort-arrow" id="arrowPhone">⇅</span></th>
                    <th on:click={sortTable('status')}>Status <span class="sort-arrow" id="arrowClient">⇅</span></th>
                    <th on:click={sortTable('Order date')}>Order date <span class="sort-arrow" id="arrowClient">⇅</span></th>
                </tr>
            </thead>
            <tbody>
                {#each filteredRows as row}
                    <tr>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.address}</td>
                        <td>{row.phone}</td>
                        <td>{row.status}</td>
                        <td>{row.date}</td>
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
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0;
        margin: 2% 0 5% 0;
        width: 100%;
        height: 100%;
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
</style>
