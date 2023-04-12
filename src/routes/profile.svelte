<script context="module">
	export async function load({ fetch, session }) {
		if (!session.user) {
			return {
				status: 303,
				redirect: '/login'
			};
		}

		const response = await fetch(`api/users/${session.user.id}`);
		const data = await response.json();
		const user = data.user;

		console.log('from script module');
		console.log(user);

		return {
			props: {
				user
			}
		};
	}
</script>

<script lang="ts">
	export let user;
</script>

<ul>
	<li>{user.id}</li>
	<li>{user.username}</li>
	<li>{user.name}</li>
	<li>{user.role}</li>
</ul>
