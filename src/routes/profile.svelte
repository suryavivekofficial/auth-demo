<script context="module">
	export async function load({ fetch, session }) {
		if (!session.user) {
			return {
				status: 303,
				redirect: '/login'
			};
		}

		const response = await fetch(`api/users/${session.user.id}`);
		const data = await response.json();
		const user = data.user;

		console.log('from script module');
		console.log(user);

		return {
			props: {
				user
			}
		};
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation';

	import Button from '$lib/components/Button.svelte';

	const handleLogout = async () => {
		const res = await fetch('/api/logout', {
			method: 'POST'
		});

		await goto('/login');
	};

	export let user;
</script>

<div class="w-full h-full flex justify-center items-center flex-col space-y-4">
	<div class="kv-container">
		<div class="kv-row">
			<div class="kv-key">Name:</div>
			<div class="kv-value">{user.name}</div>
		</div>
		<div class="kv-row">
			<div class="kv-key">Username:</div>
			<div class="kv-value">{user.username}</div>
		</div>
		<div class="kv-row">
			<div class="kv-key">Role:</div>
			<div class="kv-value">{user.role}</div>
		</div>
		<div class="kv-row">
			<div class="kv-key">Unique id:</div>
			<div class="kv-value">{user.id}</div>
		</div>
	</div>

	<button
		on:click={handleLogout}
		class="flex justify-center items-center bg-slate-700 hover:bg-slate-600 outline-none text-white font-semibold py-2 px-4 rounded duration-300 focus-visible:ring-2 focus-visible:ring-blue-500"
	>
		Logout
	</button>
</div>

<style>
	.kv-container {
		display: flex;
		flex-direction: column;
		border: 1px solid #ddd;
		border-radius: 5px;
		padding: 10px;
	}

	.kv-row {
		display: flex;
		flex-direction: row;
		margin: 5px 0;
	}

	.kv-key {
		font-weight: bold;
		min-width: 100px;
		margin-right: 10px;
	}

	.kv-value {
		flex: 1;
	}
</style>
