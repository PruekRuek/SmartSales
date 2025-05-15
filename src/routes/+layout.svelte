<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { Name } from '$lib/stores/user';

  onMount(() => {
    if (browser) {
      const stored = localStorage.getItem('user');

      // ❌ ถ้าไม่มี user → redirect ไปหน้า login
      if (!stored) {
        if (window.location.pathname !== '/login') {
          goto('/');
        }
        return;
      }

      // ✅ ถ้ามี user → ตั้งค่าชื่อใน store
      const user = JSON.parse(stored);
      Name.set(user.name ?? 'Guest');
    }
  });
</script>

<slot /> <!-- ตำแหน่งแสดงหน้าอื่น -->
