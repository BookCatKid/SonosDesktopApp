<script>
	import { devices, discovering, discover } from '$lib/sonos';
</script>

<div class="space-y-6">
	<div>
		<h2 class="mb-4 text-xl font-bold text-surface-200">Network Discovery</h2>
		<p class="mb-4 text-sm text-surface-400">
			Scan your network to find all available Sonos speakers and devices.
		</p>

		<button onclick={discover} disabled={$discovering} class="btn variant-filled-primary">
			{$discovering ? "Scanning…" : "Scan Network"}
		</button>

		{#if $discovering}
			<div class="mt-6 space-y-2">
				<div class="text-sm text-surface-400">Discovering speakers...</div>
				<div class="h-1 overflow-hidden rounded-full bg-surface-800">
					<div class="h-full w-1/3 animate-pulse bg-primary-500" />
				</div>
			</div>
		{/if}

		{#if $devices.length > 0 && !$discovering}
			<div class="mt-6 rounded border border-success-700 bg-success-900 p-4">
				<p class="text-sm text-success-200">
					✓ Found {$devices.length} speaker{$devices.length !== 1 ? "s" : ""}
				</p>
			</div>
		{/if}
	</div>
</div>
