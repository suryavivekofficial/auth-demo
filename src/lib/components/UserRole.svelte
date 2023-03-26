<script lang="ts">
	import RoleBtn from './RoleBtn.svelte';

	let checked = true;
</script>

<div class="flex h-12 w-80 justify-between items-center gap-4">
	<RoleBtn selectedRole="User" />
	<RoleBtn selectedRole="Admin" />
</div>
