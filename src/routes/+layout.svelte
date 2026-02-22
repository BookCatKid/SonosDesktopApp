<script>
	import { page } from '$app/stores';
	import { initializeEventListeners } from '$lib/sonos';
	import { onMount } from 'svelte';

	$: isHome = !$page.url.hash || $page.url.hash === '#/' || $page.url.hash === '';
	$: isDevices = $page.url.hash.includes('/devices');
	$: isDiscover = $page.url.hash.includes('/discover');
	$: isSettings = $page.url.hash.includes('/settings');

	onMount(() => {
		initializeEventListeners();
	});
</script>

<div class="flex h-screen flex-col bg-surface-950">
	<!-- Tab Bar Navigation -->
	<div class="flex border-b border-surface-800 bg-surface-900">
		<a
			href="/"
			class={`flex-1 border-b-2 px-4 py-3 text-center text-sm font-medium transition-all ${
				isHome
					? 'border-primary-500 text-primary-400'
					: 'border-transparent text-surface-400 hover:text-surface-300'
			}`}
		>
			HOME
		</a>
		<a
			href="/#/devices"
			class={`flex-1 border-b-2 px-4 py-3 text-center text-sm font-medium transition-all ${
				isDevices
					? 'border-primary-500 text-primary-400'
					: 'border-transparent text-surface-400 hover:text-surface-300'
			}`}
		>
			DEVICES
		</a>
		<a
			href="/#/discover"
			class={`flex-1 border-b-2 px-4 py-3 text-center text-sm font-medium transition-all ${
				isDiscover
					? 'border-primary-500 text-primary-400'
					: 'border-transparent text-surface-400 hover:text-surface-300'
			}`}
		>
			DISCOVER
		</a>
		<a
			href="/#/settings"
			class={`flex-1 border-b-2 px-4 py-3 text-center text-sm font-medium transition-all ${
				isSettings
					? 'border-primary-500 text-primary-400'
					: 'border-transparent text-surface-400 hover:text-surface-300'
			}`}
		>
			SETTINGS
		</a>
	</div>

	<!-- Content Area -->
	<main class="flex-1 overflow-auto bg-surface-950 p-6">
		<slot />
	</main>
</div>

<style>
	:global(body) {
		background: rgb(20, 20, 20);
		overflow: hidden;
	}
</style>
