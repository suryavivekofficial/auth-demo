<script>
	import '../app.css';
</script>

<svelte:head>
	<title>Auth Demo App</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="h-screen w-screen overflow-hidden bg-slate-200 text-gray-700">
	<slot />
</div>
