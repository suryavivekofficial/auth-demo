<script context="module">
	export async function load({ fetch, session }) {
		if(!session.userId) {
			return {
    			status: 303,
    			redirect: '/login'
    		}
		}

		const query = new URLSearchParams()
		query.set('userId', session.userId)

    	const response = await fetch(`api/users.json?${query}`);
    	const data = await response.json()
    	
	    return {
	      props: {
	        user: data[0]
	      }
	    };    	
  	}
</script>

<script>
	export let user
</script>

 profile page

<h1>your id: {user.id}</h1>
<h1>your roll no: {user.name}</h1>
<h1>your password: {user.password}</h1>
<h1>your role: {user.role}</h1>
