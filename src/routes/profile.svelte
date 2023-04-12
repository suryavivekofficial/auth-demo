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
	import Loader from '$lib/components/Loader.svelte';

	let loading = false;

	const handleLogout = async () => {
		loading = true;
		const res = await fetch('/api/logout', {
			method: 'POST'
		});

		loading = false;
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

	<form on:submit={handleLogout}>
		{#if loading}
			<Button>
				<Loader />
			</Button>
		{:else}
			<Button>Logout</Button>
		{/if}
	</form>
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
