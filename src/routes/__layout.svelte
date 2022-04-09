<script>
  // import { token } from '../stores/authStore.ts'
  // import { goto } from '$app/navigation'
  // import { page } from '$app/stores'
  import "../app.css";

  // const logout = async () => {
  //   token.set('null')
  //   await goto('/login')
  // }
</script>

<svelte:head>
  <title>Pragati College</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap" rel="stylesheet">
</svelte:head>
<!-- 
{#if $page.url.pathname !== '/login'}
<nav class="w-screen h-16 bg-slate-700 flex items-center">
  {#if $token === 'null'}
    <button class="bg-slate-50 px-4 py-2 mx-4 rounded">
      <a href="/login">
        Login
      </a>
    </button>
  {:else}
    <button on:click={logout} class="bg-slate-50 px-4 py-2 mx-4 rounded">Logout</button>
  {/if}
</nav> -->
<slot />  

<!-- {:else}
  <slot />
{/if} -->