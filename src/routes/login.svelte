<script lang="ts">
	// import { goto } from '$app/navigation';
	// import { session } from '$app/stores';
	// import Loading from '$lib/components/Loading.svelte';
	// import Overlay from '$lib/components/Overlay.svelte';
	// import { isOverlay } from '$lib/stores/overlayStore';
	import Eye from '$lib/components/Eye.svelte';
	import Button from '$lib/components/Button.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import UserRole from '$lib/components/UserRole.svelte';
	import { isVisible } from '$lib/stores/visibilityStore';

	// let password,
	// 	userFound = true,
	// 	incorrectPassword = true;
	// loading = false;

	// const toggleVisibility = () => {
	// 	if (password.type === 'password') {
	// 		password.type = 'text';
	// 		eye.classList.add('hidden');
	// 		eyeSlash.classList.remove('hidden');
	// 	} else {
	// 		password.type = 'password';
	// 		eye.classList.remove('hidden');
	// 		eyeSlash.classList.add('hidden');
	// 	}
	// };

	let checked = true;
	let placeholder;
	type RoleType = 'user' | 'admin';
	let role: RoleType = 'user';
	$: placeholder = role.charAt(0).toUpperCase() + role.slice(1);
	// const selectRole = (event) => {
	// 	const btn = event.target;
	// 	const input = btn.childNodes[0];
	// 	role = input.value;
	// 	if (!input.checked) {
	// 		checked = !checked;
	// 	}
	// };

	// const handleSubmit = async (e) => {
	// 	loading = true;
	// 	const formData = new FormData(e.target);
	// 	const data = {};
	// 	for (let field of formData) {
	// 		const [key, value] = field;
	// 		data[key] = value;
	// 	}
	// 	const res = await fetch('/api/login', {
	// 		method: 'POST',
	// 		body: JSON.stringify(data)
	// 	});
	// 	const body = await res.json();
	// 	if (body.ok) {
	// 		$session.user = body.user;
	// 		await goto(`/${body.user.role}`);
	// 	} else {
	// 		if (body.message === 'User not found') {
	// 			userFound = false;
	// 		} else if (body.message === 'Incorrect password') {
	// 			incorrectPassword = false;
	// 		}
	// 	}
	// 	loading = false;
	// };

	// const showOverlay = () => {
	// 	isOverlay.set(true);
	// };
</script>

<!-- {#if loading}
	<Loading />
{/if} -->

<!-- {#if $isOverlay}
	<Overlay />
{/if} -->

<Nav />

<div class="w-screen flex justify-center">
	<main class="w-full">
		<div class="my-8">
			<h2 class="text-center text-xl tracking-wide">Login to Your Account</h2>
		</div>

		<form
			on:submit|preventDefault={() => console.log('handle submit')}
			class="flex justify-center items-center flex-col gap-y-10 p-10"
		>
			<UserRole />
			<!-- <div class="flex h-12 w-80 justify-between items-center">
				<button
					type="button"
					on:click|preventDefault={() => console.log('select role')}
					class="cursor-pointer flex justify-center items-center outline-none"
				>
					<input
						type="radio"
						id="user"
						name="role"
						value="user"
						class="pointer-events-none hidden"
						required
						{checked}
					/>
					<label for="user" class="cursor-pointer pointer-events-none">User</label>
				</button>

				<button
					type="button"
					on:click|preventDefault={() => console.log('select role')}
					class="cursor-pointer flex justify-center items-center outline-none"
				>
					<input
						type="radio"
						id="admin"
						name="role"
						value="admin"
						class="pointer-events-none hidden"
						required
						checked={!checked}
					/>
					<label for="admin" class="cursor-pointer pointer-events-none">Admin</label>
				</button>
			</div> -->

			<!-- <div
				class="py-2 px-4 rounded outline-none border border-black flex justify-center items-center"
			>
				<input
					type="text"
					name="id"
					placeholder={`${placeholder} ID`}
					required
					pattern="\d\d[a-zA-Z]\d\d[a-zA-Z]\d\d\d\d"
					class=""
				/>
			</div> -->
			<input
				type="text"
				name="username"
				placeholder={`${placeholder} ID`}
				required
				autocomplete="off"
				class="w-80 px-4 py-2 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black"
			/>
			<div class="relative">
				<input
					type={$isVisible ? `text` : `password`}
					name="password"
					placeholder="Password"
					autocomplete="off"
					required
					class="w-80 px-4 py-2 pr-12 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black"
					id="password"
				/>
				<Eye />
			</div>
			<Button>Login</Button>

			<!-- {#if !userFound}
				<p>User not found!!!</p>
			{/if} -->
			<!-- <div class="flex">
				<input
					type="password"
					name="password"
					placeholder="Password"
					required
					bind:this={password}
					class="py-2 pl-4 pr-10 rounded outline-none border border-black"
				/>
				<Eye />
			</div> -->
			<!-- {#if !incorrectPassword}
				<p>Incorrect Password</p>
			{/if}
			<input
				type="submit"
				value="Login to your account"
				class="py-2 px-8 min-w-1/2 rounded outline-none cursor-pointer bg-black text-white border border-black hover:bg-white hover:text-black hover:px-12 duration-300"
			/> -->
		</form>
	</main>
</div>
