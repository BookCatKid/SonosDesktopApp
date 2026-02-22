<script>
	import { devices, discovering } from '$lib/sonos';
</script>

<div class="space-y-6">
	<div>
		<h1 class="mb-6 text-3xl font-bold text-surface-100">Sonos Controller</h1>
		<p class="mb-4 text-surface-400">Welcome to your desktop Sonos controller app.</p>
	</div>

	<div class="grid gap-4">
		<a
			href="/#/devices"
			class="rounded border border-surface-800 bg-surface-900 p-6 transition-all hover:border-primary-500 hover:bg-surface-800"
		>
			<h2 class="mb-2 text-xl font-semibold text-surface-100">🔊 Devices</h2>
			<p class="text-sm text-surface-400">Control your connected speakers and manage volume</p>
			{#if $devices.length > 0}
				<p class="mt-3 text-xs text-primary-400">
					{$devices.length} speaker{$devices.length !== 1 ? 's' : ''} available
				</p>
			{/if}
		</a>

		<a
			href="/#/discover"
			class="rounded border border-surface-800 bg-surface-900 p-6 transition-all hover:border-primary-500 hover:bg-surface-800"
		>
			<h2 class="mb-2 text-xl font-semibold text-surface-100">🔍 Discover</h2>
			<p class="text-sm text-surface-400">Scan your network for Sonos devices</p>
			{#if $discovering}
				<p class="mt-3 text-xs text-primary-400">Scanning...</p>
			{/if}
		</a>

		<a
			href="/#/settings"
			class="rounded border border-surface-800 bg-surface-900 p-6 transition-all hover:border-primary-500 hover:bg-surface-800"
		>
			<h2 class="mb-2 text-xl font-semibold text-surface-100">⚙ Settings</h2>
			<p class="text-sm text-surface-400">Configure app preferences and view system info</p>
		</a>
	</div>
</div>
