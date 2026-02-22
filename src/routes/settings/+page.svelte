<script>
	import { devices } from '$lib/sonos';
</script>

<div class="space-y-6">
	<div>
		<h2 class="mb-4 text-xl font-bold text-surface-200">Settings</h2>

		<div class="space-y-4">
			<div class="rounded border border-surface-800 bg-surface-900 p-4">
				<h3 class="mb-2 font-medium text-surface-100">Application</h3>
				<p class="text-sm text-surface-500">Sonos Desktop Controller v0.0.1</p>
			</div>

			<div class="rounded border border-surface-800 bg-surface-900 p-4">
				<h3 class="mb-3 font-medium text-surface-100">Theme</h3>
				<p class="text-xs text-surface-500">Current theme: Cerberus (Dark)</p>
			</div>

			<div class="rounded border border-surface-800 bg-surface-900 p-4">
				<h3 class="mb-3 font-medium text-surface-100">Network</h3>
				<p class="text-sm text-surface-500">
					{$devices.length
						? `${$devices.length} speaker${$devices.length !== 1 ? "s" : ""} connected`
						: "No speakers discovered"}
				</p>
			</div>
		</div>
	</div>
</div>
