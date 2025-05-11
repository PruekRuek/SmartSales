<script lang="ts">

    import { signOutRedirect } from '$lib/cognito/auth';
    import { Name } from '$lib/stores/user';

    const logout = async () => {
        await signOutRedirect();
    };
    
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faUser } from '@fortawesome/free-solid-svg-icons';

    let showMenu = false;
</script>

<nav>
    <img class="logo" src="/src/lib/images/logo.png" alt="Logo" />
    <ul>
        <li><a href="/form">OrderProduct</a></li>
        <li><a href="/home">Home</a></li>
        <li><a href="/clientlist">ClientList</a></li>
        <li><a href="/status">Status</a></li>
        <div class="profile" on:click={() => showMenu = !showMenu}>
            <FontAwesomeIcon icon={faUser} class="profile-icon" />
            {#if showMenu}
              <div class="dropdown">
                <li><span>{$Name}</span></li>
                <li><button on:click={logout}>Logout</button></li>
              </div>
            {/if}
        </div>
    </ul>
</nav>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Cascadia+Code:ital,wght@0,200..700;1,200..700&display=swap');

    nav {
        background-color: #567C8D;
        padding: 1rem;
        color: #F5F1EB;
        display: flex;
        align-items: center;
    }

    span{
        font-family: "Cascadia Code", sans-serif;
        color: #F5F1EB;
        font-size: 20px;
    }
    ul {
        display: flex;
        gap: 1.5rem;
        list-style: none;
        margin-left: auto; /* this pushes the ul to the right */
    }

    a {
        font-family: "Cascadia Code", sans-serif;
        text-decoration: none;
        color: #F5F1EB;
        font-size: 20px;
        transition : .2s ease-in-out;
    }

    button {
        font-family: "Cascadia Code", sans-serif;
        background: none;
        border: none;
        color: #F5F1EB;
        cursor: pointer;
        font-size: 20px;
    }

    .logo {
        width: auto;
        height: 60px;
    }

    .profile {
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;
    }


    .dropdown a {
        white-space: nowrap;
        display: block;
        color: white;
        padding: 0.5rem 1rem;
    }

    .dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        background: #2F4156;
        color: white;
        padding: 0.5rem 0.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        animation: slideDown 0.25s ease-out;
        min-width: 160px;
    }

    a:hover {
        color:#2F4156;

    }


	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
