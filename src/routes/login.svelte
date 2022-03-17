<script lang="ts">
	const data = ['category 1', 'category 2', 'category 3']
	let password
	const toggleVisibility = () => {
		if(password.type === 'password') {
			password.type = 'text'
		} else {
			password.type = 'password'
		}
	} 
</script>

<nav class="py-2 flex items-center justify-around">
	<h2 class="hover:underline"><a href="/">Pragati</a></h2>
	<ul class="flex justify-evenly">
	{#each data as piece}
		<li class="mx-4 hover:underline">
			<a href="#">{piece}</a>
		</li>
	{/each}
	</ul>
	<div>
		<button class="py-3 px-10 bg-black text-white rounded hover:text-black hover:bg-white duration-300 hover:border-black hover:border">Sign Up</button>
	</div>
</nav>

<div class="w-screen flex justify-center">
	<main class="w-1/2">
		
		<div class="mt-16 mb-8">
			<h2 class="text-center font-bold text-4xl tracking-wide">Login to Your Account</h2>
			<p class="text-center">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis molestias praesentium sapiente obcaecati rem cum? Veritatis iure corporis pariatur animi?</p>
		</div>

		<form on:submit|preventDefault={() => console.log(`submitting...`)} 
		class="flex justify-center items-center flex-col gap-y-10 p-10">
			<input type="text" name="user-id" placeholder="Teacher/Student ID" class="py-2 px-4 rounded outline-none border border-black">
			<input type="password" name="user-password" placeholder="Password" bind:this={password} class="py-2 px-4 rounded outline-none border border-black">
			<input type="submit" value="Login to your account" on:click={toggleVisibility} class="py-2 px-8 rounded outline-none cursor-pointer bg-black text-white hover:border hover:border-black hover:bg-white hover:text-black duration-300">
		</form>

	</main>
</div>