<script lang="ts">
	export let users
</script>

<a href="/login">
<h1 class="text-center my-8 hover:underline hover:text-blue-500">
  Click here to go to login page
</h1>
</a>

<a href="/teachers/dashboard">
<h1 class="text-center my-8 hover:underline hover:text-blue-500">
  Click here to go to teachers' dashboard
</h1>
</a>

<h1 class="text-center my-12 text-2xl">Registered Users</h1>

{#each users as user, index }
	<h3 class="text-center my-4">{index+1}.{user.name} and {user.password}</h3>
{/each}