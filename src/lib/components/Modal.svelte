<script lang="ts">
	import Check from './Check.svelte';
	import Xmark from './Xmark.svelte';
	import { fly } from 'svelte/transition';
	import { isPopup } from '$lib/stores/popupStore';
	import { onMount } from 'svelte';

	export let msg: string;
	export let success: boolean;
</script>

{#if $isPopup}
	<div
		transition:fly={{ y: -200, duration: 2000 }}
		class="absolute top-4 left-1/2 -translate-x-1/2 w-48 h-12 bg-white rounded-md shadow-md border border-gray-300 flex flex-col justify-between"
	>
		<div class="flex-1 flex justify-between items-center px-4">
			{msg}
			{#if success}
				<Check />
			{:else}
				<Xmark />
			{/if}
		</div>
		<div
			class="h-1 bg-blue-500 rounded-bl-md w-full animate-[slide_3s_linear_forwards] origin-left delay-[3s]"
		/>
	</div>
{/if}
