<script context="module">
	export async function load({ fetch, session }) {
		// if (!session.user) {
		// 	return {
		// 		status: 303,
		// 		redirect: '/login'
		// 	};
		// }

		const response = await fetch(`api/users/${session.user.id}`);
		const data = await response.json();
		const user = data.user;

		console.log('from script module');
		console.log(user);

		return {
			// status: 303,
			// redirect: '/profile'
			props: {
				user
			}
		};
	}
</script>

<script lang="ts">
	export let user;

	// import { goto } from '$app/navigation';
	// import { user } from '$lib/stores/sessionStore';

	// if (!$user) {
	// 	goto('/login');
	// }
</script>

<ul>
	<li>{$user.id}</li>
	<li>{$user.username}</li>
	<li>{$user.name}</li>
	<li>{$user.role}</li>
</ul>
