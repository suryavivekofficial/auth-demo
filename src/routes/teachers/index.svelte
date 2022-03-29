<script lang="ts">
	
	import Questions from '$lib/components/Questions.svelte';
	import Quesform from '$lib/components/Quesform.svelte'
	import { questions } from '../../stores/testStore.ts';
</script>

<div class="flex items-center flex-col">
	<h1 class="text-2xl underline m-8">Teacher's Dashboard</h1>
	<Quesform />
	{#each $questions as question, index}
		<div class="bg-gray-300 m-8 w-10/12 p-8">
			<Questions {question} {index}/>
		</div>
	{/each}
</div>