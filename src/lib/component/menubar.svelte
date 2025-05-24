<script lang="ts">
  import { signOutRedirect } from '$lib/cognito/auth';
  import { Name } from '$lib/stores/user';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faUser } from '@fortawesome/free-solid-svg-icons';

  let showMenu = false;

  const logout = async () => {
    localStorage.removeItem('user'); // ลบข้อมูล user
    await signOutRedirect(); // Redirect ไป logout Cognito
  };
</script>

<nav>
  <img class="logo" src="/images/logo.png" alt="Logo" />
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
  nav {
    background-color: #567C8D;
    padding: 1rem;
    color: #F5F1EB;
    display: flex;
    align-items: center;
  }

  ul {
    display: flex;
    gap: 1.5rem;
    list-style: none;
    margin-left: auto;
  }

  a {
    font-family: "Cascadia Code", sans-serif;
    text-decoration: none;
    color: #F5F1EB;
    font-size: 20px;
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

  .dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background: #2F4156;
    color: white;
    padding: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    animation: slideDown 0.25s ease-out;
    min-width: 160px;
  }

  .dropdown li {
    padding: 0.5rem;
  }

  span {
    font-family: "Cascadia Code", sans-serif;
    font-size: 18px;
    color: white;
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
