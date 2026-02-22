<script>
	import { devices, volumes, error } from '$lib/sonos';
</script>

<div class="space-y-4">
	<div>
		<h2 class="mb-4 text-xl font-bold text-surface-200">Connected Speakers</h2>
		{#if $error}
			<div class="mb-4 rounded border border-error-500 bg-error-900 p-4 text-error-200">
				{$error}
			</div>
		{/if}

		{#if $devices.length === 0}
			<div class="rounded border border-dashed border-surface-700 p-8 text-center">
				<p class="text-surface-400">No speakers discovered yet</p>
				<p class="mt-2 text-sm text-surface-500">Go to the DISCOVER tab to scan your network</p>
			</div>
		{:else}
			<div class="space-y-3">
				{#each $devices as device (device.uuid)}
					<div
						class="rounded border border-surface-800 bg-surface-900 p-4 transition-all hover:border-surface-700 hover:bg-surface-800"
					>
						<div class="mb-3 flex items-start justify-between">
							<div>
								<h3 class="font-semibold text-surface-100">{device.name}</h3>
								{#if device.groupName}
									<p class="text-xs text-surface-500">{device.groupName}</p>
								{/if}
								<p class="text-xs text-surface-600">{device.host}</p>
							</div>
						</div>

						<div class="mb-3 flex gap-1">
							<button
								onclick={() => window.sonos.previous(device.host)}
								class="flex-1 rounded bg-surface-800 px-2 py-1.5 text-xs font-medium text-surface-300 transition-colors hover:bg-surface-700"
							>
								⏮
							</button>
							<button
								onclick={() => window.sonos.play(device.host)}
								class="flex-1 rounded bg-success-900 px-2 py-1.5 text-xs font-medium text-success-300 transition-colors hover:bg-success-800"
							>
								▶
							</button>
							<button
								onclick={() => window.sonos.pause(device.host)}
								class="flex-1 rounded bg-warning-900 px-2 py-1.5 text-xs font-medium text-warning-300 transition-colors hover:bg-warning-800"
							>
								⏸
							</button>
							<button
								onclick={() => window.sonos.next(device.host)}
								class="flex-1 rounded bg-surface-800 px-2 py-1.5 text-xs font-medium text-surface-300 transition-colors hover:bg-surface-700"
							>
								⏭
							</button>
						</div>

						<div class="flex items-center gap-3">
							<span class="min-w-fit text-xs font-medium text-surface-400">VOL</span>
							<input
								type="range"
								min="0"
								max="100"
								value={$volumes[device.host] ?? 50}
								oninput={(e) => {
									$volumes[device.host] = Number(e.currentTarget.value);
									window.sonos.setVolume(device.host, Number(e.currentTarget.value));
								}}
								class="range flex-1"
							/>
							<span class="min-w-8 text-right text-xs font-mono text-surface-400">
								{$volumes[device.host] ?? "–"}
							</span>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
