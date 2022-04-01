<script>
	import { delQues } from '../../stores/testStore.ts'
	export let question, index

	// const delQues = (id) => {
	// 	console.log(id)
	// }
</script>

<div>
	<div class="text-2xl mb-2 flex justify-between">
		{index+1}: {question.text}

		<button
			on:click={() => delQues(question.id)} 
			class="bg-red-500 hover:bg-red-600 px-4 py-2 mx-8 text-sm rounded text-white">
			Delete
		</button>
	</div>
	<div class="text-lg">
		<div>a: <span class="ml-4">{question.option1}</span></div>
		<div>b: <span class="ml-4">{question.option2}</span></div>
		<div>c: <span class="ml-4">{question.option3}</span></div>
		<div>d: <span class="ml-4">{question.option4}</span></div>
	</div>
</div>