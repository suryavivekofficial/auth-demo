<script>
	export let question, index
	// console.log(question)
</script>

<div class="">
	<div>
		{index+1}: {question.text}
	</div>
	<div>
		a: {question.option1}
	</div>
	<div>
		b: {question.option2}
	</div>
	<div>
		c: {question.option3}
	</div>
	<div>
		d: {question.option4}
	</div>
</div>