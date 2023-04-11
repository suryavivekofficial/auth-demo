<script lang="ts">
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores/sessionStore';

	if (!$user) {
		goto('/login');
	}
</script>

<ul>
	<li>{$user.id}</li>
	<li>{$user.username}</li>
	<li>{$user.name}</li>
	<li>{$user.role}</li>
</ul>
