<script lang="ts" >
export let users
console.log('In frontend');

console.log(users);

</script>

<a href="/login">
<h1 class="text-center my-8 hover:underline hover:text-blue-500">
  Click here to go to login page
</h1>
</a>
<h1>Registered Users</h1>
<!-- 
{#each users as user }
	<h3>{user.name} and {user.password}</h3>
{/each} -->