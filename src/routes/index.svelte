<script context="module">
	export async function load({ fetch, session }) {
		if(!session.user) {
			return {
    			status: 303,
    			redirect: '/login'
    		}
		}

    	const response = await fetch(`api/users/${session.user.id}`);
    	const data = await response.json()
    	const user = data.user
    	if(user.role === 'teacher'){
    		return {
    			status: 303,
    			redirect: '/teacher'
    		}
    	} else {
    		return {
    			status: 303,
    			redirect: '/student'
    		}
    	}  	
  	}
</script>