<script lang="ts">
	import Questions from '$lib/components/Questions.svelte';
	import Quesform from '$lib/components/Quesform.svelte'
	import { questions } from '../../stores/testStore.ts';
	
	async function doPost () {
		const res = await fetch('/api/tests.json', {
			method: 'POST',
			 headers: {
      			'Content-Type': 'application/json'
    		},
			body: JSON.stringify($questions)
		})
		
		const data = await res.json()
		alert(`submitted ${data.count} question(s) to database`)
	}
</script>

<div class="flex items-center flex-col">
	<h1 class="text-2xl underline m-8">Teacher's Dashboard</h1>
	<Quesform />
	{#each $questions as question, index}
		<div class="bg-gray-200 m-8 w-10/12 p-8">
			<Questions {question} {index}/>
		</div>
	{/each}
	{#if $questions.length}
		<!-- <button 
			class="py-4 px-10 mx-auto my-4 cursor-pointer bg-black text-white rounded hover:text-black hover:bg-white hover:px-14 duration-300 border-black border">
			Create a level
		</button> -->
		<button
			on:click={doPost} 
			class="py-4 px-10 mx-auto my-4 cursor-pointer bg-black text-white rounded hover:text-black hover:bg-white hover:px-14 duration-300 border-black border">
			Submit Test
		</button>
	{/if}
</div>