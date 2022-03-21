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

<div class="w-full flex justify-center">
	<table class="border border-black">
		<thead class="bg-slate-700 text-white">
			<tr>
				<th class="p-4">Username</th>
				<th class="p-4">Role</th>
				<th class="p-4">Password</th>
			  </tr>
		  </thead>
	
		  <tbody>
			{#each users as user}
				<tr>
					<td class="p-4 border border-black">{user.name}</td>
					<td class="p-4 border border-black">{user.role}</td>
					<td class="p-4 border border-black">{user.password}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>