<script lang="ts">
	import Check from './Check.svelte';
	import Xmark from './Xmark.svelte';
	import { fly } from 'svelte/transition';
	import { isPopup, openPopup } from '$lib/stores/popupStore';

	export let msg: string;
	export let success: boolean;
</script>

{#if $isPopup}
	<div
		transition:fly={{ y: -200, duration: 2000 }}
		class="absolute top-4 left-1/2 -translate-x-1/2 w-max h-12 bg-white rounded-md shadow-md border border-gray-300 flex flex-col justify-between"
	>
		<div class="flex-1 flex justify-between items-center px-4 space-x-4">
			<span>{msg}</span>
			{#if success}
				<span>
					<Check />
				</span>
			{:else}
				<span>
					<Xmark />
				</span>
			{/if}
		</div>
		<div
			class="h-1 bg-blue-500 rounded-bl-md w-full animate-[slide_5s_linear_forwards] origin-left"
		/>
	</div>
{/if}
