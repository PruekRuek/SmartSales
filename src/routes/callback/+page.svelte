<script lang="ts">
	import { onMount } from 'svelte';
	import { userManager } from '$lib/cognito/auth';
	import { goto } from '$app/navigation';
	import { Name } from '$lib/stores/user';

	let error = '';

	onMount(async () => {
		try {
			const user = await userManager.signinCallback();

			if (!user) {
				error = 'Login failed: No user returned from signinCallback';
				return;
			}
			localStorage.setItem('user', JSON.stringify(user.profile));	
			
			Name.set(user.profile?.name ?? 'No name');

			// ✅ ส่งข้อมูล user พร้อมเบอร์โทร
			await fetch("https://ege8ytw7t8.execute-api.us-east-1.amazonaws.com/user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					sub: user.profile.sub,
					email: user.profile.email,
					name: user.profile.name ?? 'No name',
					phone: user.profile.phone_number ?? 'N/A'  // ✅ เพิ่มเบอร์โทรตรงนี้
				})
			});

			goto('/home');
		} catch (err: any) {
			error = `Login failed: ${err.message}`;
		}
	});
</script>

{#if error}
<p style="color: red;">{error}</p>
{/if}
