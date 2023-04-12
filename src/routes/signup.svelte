<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Eye from '$lib/components/Eye.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import UserRole from '$lib/components/UserRole.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import Popup from '$lib/components/Popup.svelte';

	import { role, type RoleType } from '$lib/stores/roleStore';
	import { isVisible } from '$lib/stores/visibilityStore';
	import { openPopup } from '$lib/stores/popupStore';
	import { loginUser } from '$lib/stores/sessionStore';
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';

	let confirmPassword: string;
	let passwordError = false;
	let usernameError = true;
	let isUsernameAvailable = true;
	let loading = false;
	let isSuccess: boolean;

	const userInputs = {
		fullName: '',
		username: '',
		password: '',
		role: $role
	};

	role.subscribe((value) => (userInputs.role = value));

	const clearInputs = () => {
		userInputs.fullName = '';
		userInputs.username = '';
		userInputs.password = '';
		confirmPassword = '';
		role.set('USER');
	};

	const handleSubmit = async (event) => {
		loading = true;
		validateUsername(userInputs.username);
		const res = await fetch('/api/users', {
			method: 'POST',
			body: JSON.stringify(userInputs)
		});
		const data = await res.json();
		console.log(data);
		if (data.success) {
			isSuccess = true;
			//set user data as state
			// loginUser(data.user);
			$session.user = data.user;
			goto('/profile');
		} else {
			isSuccess = false;
		}
		loading = false;
		openPopup();
		clearInputs();
	};

	const validateUsername = async (username: string) => {
		const regex = /^[a-zA-Z0-9_]+$/;
		if (username.trim().length !== 0) usernameError = regex.test(username);

		const usernameInDB = await fetch(`/api/username?username=${username}`);
		const data = await usernameInDB.json();

		isUsernameAvailable = data['isUsernameAvailable'];
	};

	const checkPassword = () => {
		if (userInputs.password !== confirmPassword && confirmPassword.trim().length !== 0) {
			passwordError = true;
		} else passwordError = false;
	};
</script>

<Nav url="/login" />

{#if isSuccess}
	<Popup msg={'Sign up successful'} success={true} />
{:else}
	<Popup msg={'Something went wrong!'} success={false} />
{/if}

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
				placeholder={`${$role.charAt(0).toUpperCase() + $role.slice(1).toLowerCase()} ID`}
				required
				autocomplete="off"
				class={`${
					!usernameError ? 'ring-red-500' : 'ring-blue-500'
				} w-80 px-4 py-2 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2  focus:border-transparent bg-white text-black`}
			/>
			{#if !usernameError && userInputs.username.length > 0}
				<p class="text-xs p-1 text-red-500">
					{`${
						$role.charAt(0).toUpperCase() + $role.slice(1).toLowerCase()
					} ID should not contain special characters.`}
				</p>
			{/if}

			{#if !isUsernameAvailable}
				<p class="text-xs p-1 text-red-500">Username not available!</p>
			{/if}
		</div>

		<!-- Password Input -->
		<div>
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
			{#if userInputs.password.length > 0 && userInputs.password.length < 6}
				<p class="text-xs p-1 text-red-500">Password should be more than 6 characters long.</p>
			{/if}
		</div>

		<!-- Check password input -->
		<div>
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
			{#if passwordError}
				<p class="text-xs p-1 text-red-500">Passwords do not match!</p>
			{/if}
		</div>

		{#if loading}
			<Button>
				<Loader />
			</Button>
		{:else}
			<Button>Sign Up</Button>
		{/if}
	</form>
</div>
