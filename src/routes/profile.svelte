<script context="module">
	export async function load({ fetch, session }) {
		if(!session.userId) {
			return {
    			status: 303,
    			redirect: '/login'
    		}
		}

    	const response = await fetch(`api/users/${session.userId}`);
    	const data = await response.json()
	    return {
	      props: {
	        user: data.user
	      }
	    };    	
  	}
</script>

<script>
	import { session } from '$app/stores'
	
	const logout = async () => {
		const res = await fetch(`/api/logout`, {
			method: 'POST'
		})
		$session.userId = ''
	}

	export let user
</script>

 profile page

<div class="m-8">

<h1>your id: {user.id}</h1>
<h1>your roll no: {user.name}</h1>
<h1>your password: {user.password}</h1>
<h1>your role: {user.role}</h1>


<button 
	on:click={logout}
	class="py-3 px-10 m-4 bg-black text-white rounded hover:text-black hover:bg-white duration-300 border-black border">
	Log Out
</button>
</div>