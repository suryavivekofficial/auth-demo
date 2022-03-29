<script lang="ts">
	import {questions, addQues} from '../../stores/testStore.ts'
	import Batches from "$lib/components/Batches.svelte";

	let questionText, option1, option2, option3, option4, correctAns
	const handleSubmit = () => {
		const question = {
			text: questionText,
			option1,
			option2,
			option3,
			option4,
			correctAns
		}
		addQues(question)
	}
</script>


<Batches />
<form on:submit|preventDefault={handleSubmit} class="px-4 py-2 flex flex-col">

	<div class="w-full">
		<label for="question">Question:</label>
		<input
			bind:value={questionText}
			type="text"
			name="question"
			id="question"
			class="outline-none border-b border-black focus:border-blue-500 px-4 py-2 m-4 w-5/6"
			required
		>
	</div>

	<div>
		<div class="flex">
			<div>
				<input bind:group={correctAns} type="radio" name="correct-ans" id="option-1" value="option1" required>
				<label for="option-1">Option 1:</label>
				<input
					bind:value={option1}
					type="text"
					name="option-1"
					class="outline-none border-b border-black focus:border-blue-500 px-4 py-2 m-4"
					required
			>
			</div>
			<div>
				<input bind:group={correctAns} type="radio" name="correct-ans" id="option-2" value="option2" required>
				<label for="option-2">Option 2:</label>
				<input
					bind:value={option2}
					type="text"
					name="option-2"
					class="outline-none border-b border-black focus:border-blue-500 px-4 py-2 m-4"
					required
			>
			</div>
		</div>

		<div class="flex">
			<div>
				<input bind:group={correctAns} type="radio" name="correct-ans" id="option-3" value="option3" required>
				<label for="option-3">Option 3:</label>
				<input
					bind:value={option3}
					type="text"
					name="option-3"
					class="outline-none border-b border-black focus:border-blue-500 px-4 py-2 m-4"
					required
			>
			</div>
			<div>
				<input bind:group={correctAns} type="radio" name="correct-ans" id="option-4" value="option4" required>
				<label for="option-4">Option 4:</label>
				<input
					bind:value={option4}
					type="text"
					name="option-4"
					class="outline-none border-b border-black focus:border-blue-500 px-4 py-2 m-4"
					required
			>
			</div>
		</div>
	</div>

	<input 
		type="submit" 
		value="add question" 
		class="py-4 px-10 mx-auto my-4 cursor-pointer bg-black text-white rounded hover:text-black hover:bg-white hover:px-14 duration-300 border-black border"
	>
</form>