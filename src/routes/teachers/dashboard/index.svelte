<script lang="ts">
	const branches = ['All', 'CSE', 'ECE', 'EEE', 'Mech', 'Civil']
	const years = ['All', 1, 2, 3, 4 ]
</script>

<div class="flex justify-center items-center flex-col gap-8">
	<h1>Teacher's Dashboard</h1>
	
	<form  class="flex-col justify-center items-center flex gap-24">
		<div class="flex gap-12">
			<div class="">
				<h3>Select branch</h3>
				<select class="focus:outline-none p-4" name="Branch">
					{#each branches as branch }
						<option value={branch}>{branch}</option>
					{/each}
				</select>
			</div>
			
			<div class="">
				<h3>Select Year</h3>
				<select class="focus:outline-none p-4" name="Year">
					{#each years as year }
						<option value={year}>{year}</option>
					{/each}
				</select>
			</div>
		</div>

		<input type="submit" value="Create Test" class="py-3 px-10 cursor-pointer bg-black text-white rounded hover:text-black hover:bg-white duration-300 border-black border">
	</form>
</div>