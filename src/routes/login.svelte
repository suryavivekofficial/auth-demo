<script lang="ts">
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';

	import Eye from '$lib/components/Eye.svelte';
	import Button from '$lib/components/Button.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import UserRole from '$lib/components/UserRole.svelte';
	import Popup from '$lib/components/Popup.svelte';
	import Loader from '$lib/components/Loader.svelte';

	import { role } from '$lib/stores/roleStore';
	import { isVisible } from '$lib/stores/visibilityStore';
	import { openPopup } from '$lib/stores/popupStore';

	let msg: '';
	let loading = false;
	let username = '';
	let password = '';

	const handleSubmit = async () => {
		loading = true;

		const res = await fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify({ username, password, role: $role })
		});
		const body = await res.json();

		if (body.success) {
			$session.user = body.user;
			await goto(`/profile`);
		} else {
			console.log(body);
			msg = body.message;
			openPopup();
		}
		loading = false;
	};
</script>

<Popup {msg} success={false} />

<Nav url="/signup" />

<div class="w-screen flex flex-col justify-center">
	<div class="my-8">
		<h2 class="text-center text-xl tracking-wide">Login to an existing account</h2>
	</div>

	<form
		on:submit|preventDefault={handleSubmit}
		class="flex justify-center items-center flex-col gap-y-10 p-10"
	>
		<UserRole />

		<input
			bind:value={username}
			type="text"
			name="username"
			placeholder={`${$role.charAt(0).toUpperCase() + $role.slice(1).toLowerCase()} ID`}
			required
			autocomplete="off"
			class="w-80 px-4 py-2 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black"
		/>

		<div class="relative">
			{#if $isVisible}
				<input
					bind:value={password}
					type="text"
					name="password"
					placeholder="Password"
					autocomplete="off"
					required
					class="w-80 px-4 py-2 pr-12 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black"
					id="password"
				/>
			{:else}
				<input
					bind:value={password}
					type="password"
					name="password"
					placeholder="Password"
					autocomplete="off"
					required
					class="w-80 px-4 py-2 pr-12 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black"
					id="password"
				/>
			{/if}
			<Eye />
		</div>
		{#if loading}
			<Button>
				<Loader />
			</Button>
		{:else}
			<Button>Login</Button>
		{/if}
	</form>
</div>
