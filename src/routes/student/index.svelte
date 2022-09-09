<script context="module">
	export async function load({ session }) {
		if(!session.user) {
			return {
    			status: 303,
    			redirect: '/login'
    		}
		}

		return {
			status: 200
		}
  	}
</script>

<script>
	import { session } from '$app/stores'
	import { goto } from '$app/navigation'
	import Loading from '$lib/components/Loading.svelte';	
	
	let loading = false

	const logout = async () => {
		loading = true
		const res = await fetch(`/api/logout`, {
			method: 'POST'
		})
		$session.user = ''
		await goto('/login')
		loading = false
	}

	const user = $session.user
</script>


{#if loading}
	<Loading />
{/if}

 profile page

<div class="m-8">

<h1>your id: {user.id}</h1>
<h1>your roll no: {user.rollNo}</h1>
<h1>your name: {user.name}</h1>
<h1>your role: {user.role}</h1>

<button 
	on:click={logout}
	class="py-3 px-10 m-4 bg-black text-white rounded hover:text-black hover:bg-white duration-300 border-black border">
	Log Out
</button>
</div>

