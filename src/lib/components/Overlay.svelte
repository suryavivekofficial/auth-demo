<script lang="ts">
	import { isOverlay } from '$lib/stores/overlayStore';

	const closeOverlay = () => isOverlay.set(false);
</script>

<div
	class="h-screen w-screen fixed top-0 right-0 bg-white text-center opacity-95 flex justify-center items-center"
>
	<div class="bg-slate-200 p-12 rounded relative">
		<button on:click={closeOverlay} class="text-2xl absolute right-4 top-2 hover:scale-125"
			>&times;</button
		>
		<table class="text-center">
			<caption class="mb-2 underline">Sample data</caption>
			<tr class="border">
				<th class="border border-white p-4">Name</th>
				<th class="border border-white p-4">Roll No</th>
				<th class="border border-white p-4">Password</th>
			</tr>
			<tr class="border">
				<td class="border border-white p-4">Surya vivek</td>
				<td class="border border-white p-4">20A31A4260</td>
				<td class="border border-white p-4">vivek</td>
			</tr>
			<tr class="border">
				<td class="border border-white p-4">Nazmeer</td>
				<td class="border border-white p-4">20A31A4225</td>
				<td class="border border-white p-4">nazmeer</td>
			</tr>
			<tr class="border">
				<td class="border border-white p-4">Sanjay</td>
				<td class="border border-white p-4">20A31A4244</td>
				<td class="border border-white p-4">sanjay</td>
			</tr>
		</table>
	</div>
</div>
