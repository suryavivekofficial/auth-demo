<script lang="ts">
	export let url: string;

	import Button from './Button.svelte';
</script>

<nav class="py-4 px-8 md:px-12 flex items-center justify-between">
	<h2 class="font-bold text-2xl tracking-widest"><a href="/">LOGO</a></h2>
	<!-- <button on:click={showOverlay}>Show sample data</button> -->
	<div>
		<a href={url}>
			{#if url === '/signup'}
				<Button>Sign Up</Button>
			{:else}
				<Button>Log In</Button>
			{/if}
		</a>
	</div>
</nav>
