<script lang="ts">
	import {branch, year} from '../../stores/testStore.ts'

	const branches = ['All', 'CSE', 'ECE', 'EEE', 'Mech', 'Civil']
	const years = ['All', 1, 2, 3, 4 ]

	const handleSubmit = (event) => {
		const menu = event.target
		const selected = menu.options[menu.selectedIndex].value
		if(menu.name == 'branch') {
			branch.set(selected)
		} else if (menu.name == 'year'){
			year.set(selected)
		} else {
			console.error('Invalid')
		}
	}
</script>

<div class="flex-col items-center flex w-2/3">
	<div class="flex w-full items-center justify-around">
		<div class="">
			<label for="branch" class="mx-2">Select branch</label>
			<select on:change={handleSubmit} name="branch" id="branch" class="focus:outline-none p-4">
				{#each branches as branch }
					<option value={branch}>{branch}</option>
				{/each}
			</select>
		</div>
		
		<div>
			<label for="year" class="mx-2">Select Year</label>
			<select on:change={handleSubmit} name="year" id="year" class="focus:outline-none p-4">
				{#each years as year }
					<option value={year}>{year}</option>
				{/each}
			</select>
		</div>
	</div>
</div>