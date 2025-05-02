<script lang="ts">
	import { onMount } from 'svelte';
	import { userManager } from '$lib/cognito/auth';
	import { goto } from '$app/navigation';
	import { Name } from '$lib/stores/user'; // ✅ import store

	let error = '';

	onMount(async () => {
		try {
			const user = await userManager.signinCallback();

			if (!user) {
				error = 'Login failed: No user returned from signinCallback';
				return;
			}
            console.log('User profile:', user.profile);

			// ✅ ใส่ชื่อที่ได้จาก Cognito ลง store
			Name.set(user.profile?.name ?? 'No name');

			goto('/home');
		} catch (err: any) {
			error = `Login failed: ${err.message}`;
		}
	});
</script>

{#if error}
<p style="color: red;">{error}</p>
{/if}
