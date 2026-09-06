<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import NavBar from '$lib/components/NavBar.svelte';

	let { children } = $props();
</script>

<Header />

<main>
	{@render children?.()}
</main>

<NavBar />

<style>
	main {
		padding-bottom: 100px;
	}
</style>