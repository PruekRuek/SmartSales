<script>
    import { userManager } from '$lib/cognito/auth';
  
    const login = async () => {
      await userManager.signinRedirect();
    };
  </script>
  
<main>
    <img src="/images/logo.png">
    <button on:click={login}>Go to Login</button>
</main>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

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

    button{
        font-family: "Bebas Neue", sans-serif;
        background-color: #2F4156;
        color: #F5F1EB;
        padding: 36px 48px;   
        font-size: 36px;
        border: none;                   /* ไม่มีเส้นขอบ */
        border-radius: 8px;             /* ขอบมน */
        box-shadow: 0 4px 6px rgba(0,0,0,0.2); /* เงา */
        cursor: pointer;                /* เปลี่ยนเป็นรูปมือเวลา hover */
        transition: all 0.3s ease; 
    }

    button:hover {
        background-color: #567C8D;      /* สีเวลาชี้ */
        transform: scale(1.05);         /* ขยายเล็กน้อย */
    }

    img {
        width: auto;       /* ความกว้าง */
        height: 210px;      /* ความสูง */
        margin-bottom: 40px;
        object-fit: cover;
    }

    main {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        animation: change 10s infinite;
    }
</style>