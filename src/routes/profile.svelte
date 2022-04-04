<script>
	import { goto } from '$app/navigation'
	import { token } from '../stores/authStore.ts'
	import { onMount } from 'svelte'
	import { browser } from '$app/env';
	import Loading from '$lib/components/Loading.svelte'


	let name = ''
	let loading = false

	const auth = async (authToken) => {
		loading = true
		if(authToken === 'null') {
			loading = false
			await goto('/login')
		} else {
			const res = await fetch('/api/profile.json', {
	    		method: 'POST',
	    		body: JSON.stringify(authToken)
	    	})
	    	const response = await res.json()
	    	name = response.user.password
		}
		loading = false
	}
	if(browser){
		auth($token)
	}
</script>


{#if loading}
	<Loading />
{/if}

<h1>hello {name}</h1>