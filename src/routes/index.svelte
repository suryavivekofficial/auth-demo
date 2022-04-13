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
    	const user = data.user
    	if(user.role === 'teacher'){
    		return {
    			status: 303,
    			redirect: '/teachers'
    		}
    	} else {
    		return {
    			status: 303,
    			redirect: '/students'
    		}
    	}  	
  	}
</script>