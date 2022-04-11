<script context="module">
  export async function load({ fetch }) {
    const response = await fetch(`api/tests`);
    const data = await response.json()

    return {
      props: {
        questions: data.questions
      }
    };
  }
</script>

<script lang="ts">
	export let questions
</script>

{#each questions as question, index}
	<div>{question.text}</div>
	<div>{question.option1}</div>
	<div>{question.option2}</div>
	<div>{question.option3}</div>
	<div>{question.option4}</div>
	<div>{question.correctAns}</div>
{/each}