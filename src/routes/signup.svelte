<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Eye from '$lib/components/Eye.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import UserRole from '$lib/components/UserRole.svelte';
	import { role, type RoleType } from '$lib/stores/roleStore';
	import { isVisible } from '$lib/stores/visibilityStore';

	let confirmPassword: string;
	let passwordError = false;
	let usernameError = true;

	type userInputsType = {
		fullName: string;
		username: string;
		password: string;
		role: RoleType;
	};

	const userInputs: userInputsType = {
		fullName: '',
		username: '',
		password: '',
		role: $role
	};

	const handleSubmit = async (event) => {
		const res = await fetch('/api/users', {
			method: 'POST',
			body: JSON.stringify(userInputs)
		});
		console.log(await res.json());
	};

	const validateUsername = (username: string) => {
		const regex = /^[a-zA-Z0-9_]+$/;
		if (username.trim().length !== 0) usernameError = regex.test(username);
	};

	const checkPassword = () => {
		if (userInputs.password !== confirmPassword && confirmPassword.trim().length !== 0) {
			passwordError = true;
		} else passwordError = false;
	};
</script>

<Nav url="/login" />

<div class="w-screen flex flex-col justify-center">
	<div class="mt-8">
		<h2 class="text-center text-xl tracking-wide">Create a new account</h2>
	</div>

	<form
		on:submit|preventDefault={(event) => handleSubmit(event)}
		class="flex justify-center items-center flex-col gap-y-6 p-10"
	>
		<!-- Full Name input field -->
		<input
			type="text"
			name="name"
			bind:value={userInputs.fullName}
			placeholder="Full name"
			required
			autocomplete="off"
			class="w-80 px-4 py-2 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 ring-blue-500 focus:border-transparent bg-white text-black"
		/>

		<!-- User role selection -->
		<UserRole />

		<!-- Username Input -->
		<div>
			<input
				bind:value={userInputs.username}
				on:input={() => validateUsername(userInputs.username)}
				type="text"
				name="username"
				placeholder={`${$role} ID`}
				required
				autocomplete="off"
				class={`${
					!usernameError ? 'ring-red-500' : 'ring-blue-500'
				} w-80 px-4 py-2 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2  focus:border-transparent bg-white text-black`}
			/>
			<p class:hidden={usernameError} class="text-xs p-1 text-red-500">
				{`${$role} ID should not contain special characters`}
			</p>
		</div>

		<!-- Password Input -->
		<div class="relative">
			{#if $isVisible}
				<input
					type="text"
					name="password"
					bind:value={userInputs.password}
					placeholder="Password"
					autocomplete="off"
					required
					class="w-80 px-4 py-2 pr-12 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black"
					id="password-text"
				/>
			{:else}
				<input
					type="password"
					name="password"
					bind:value={userInputs.password}
					placeholder="Password"
					autocomplete="off"
					required
					class="w-80 px-4 py-2 pr-12 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black"
					id="password-password"
				/>
			{/if}

			<Eye />
		</div>

		<!-- Check password input -->
		<div class="relative">
			{#if $isVisible}
				<input
					on:keyup={checkPassword}
					bind:value={confirmPassword}
					type="text"
					name="password"
					placeholder="Confirm password"
					autocomplete="off"
					required
					class={`${
						passwordError ? 'focus:ring-red-500' : 'focus:ring-blue-500'
					} w-80 px-4 py-2 pr-12 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent bg-white text-black`}
					id="password"
				/>
			{:else}
				<input
					on:keyup={checkPassword}
					bind:value={confirmPassword}
					type="password"
					name="password"
					placeholder="Confirm password"
					autocomplete="off"
					required
					class={`${
						passwordError ? 'focus:ring-red-500' : 'focus:ring-blue-500'
					} w-80 px-4 py-2 pr-12 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent bg-white text-black`}
					id="password"
				/>
			{/if}

			<Eye />
		</div>

		<Button>Sign Up</Button>
	</form>
</div>
