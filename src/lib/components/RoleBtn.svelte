<script lang="ts">
	export let selectedRole: RoleType;

	import type { RoleType } from '$lib/stores/roleStore';
	import { role } from '$lib/stores/roleStore';

	let checked: boolean;
	$: checked = $role === selectedRole;
</script>

<button
	type="button"
	on:click|preventDefault={() => role.set(selectedRole)}
	class={`${
		checked ? 'ring-blue-500 text-blue-500 ring-2 bg-blue-100' : 'ring-slate-700/50 ring-1'
	} 
			cursor-pointer flex px-4 space-x-2 items-center outline-none h-full flex-1 duration-300 font-bold rounded focus-visible:text-blue-300 focus-visible:ring-1 focus-visible:bg-blue-100`}
>
	<span
		class={`w-4 h-4 rounded-full border flex justify-center items-center ${
			checked ? 'border-blue-500' : 'border-slate-700'
		}`}
	>
		<div class:hidden={!checked} class="w-3/5 h-3/5 rounded-full bg-blue-500" />
	</span>
	<input
		type="radio"
		id={selectedRole}
		name="role"
		value={selectedRole}
		class="pointer-events-none hidden"
		required
		{checked}
	/>
	<label for={selectedRole} class="cursor-pointer pointer-events-none">
		{selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1).toLowerCase()}
	</label>
</button>
