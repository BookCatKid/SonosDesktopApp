<script>
	let devices = $state([]);
	let discovering = $state(false);
	let error = $state("");
	let volumes = $state({});

	async function discover() {
		discovering = true;
		error = "";
		try {
			devices = await window.sonos.discover();
			for (const device of devices) {
				volumes[device.host] = await window.sonos.getVolume(device.host);
			}
		} catch (err) {
			error = String(err);
		} finally {
			discovering = false;
		}
	}

	async function handleVolumeChange(host, value) {
		volumes[host] = value;
		await window.sonos.setVolume(host, value);
	}
</script>

<main class="mx-auto max-w-2xl p-8">
	<h1 class="mb-6 text-3xl font-bold">Sonos Controller</h1>

	<button
		onclick={discover}
		disabled={discovering}
		class="mb-6 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
	>
		{discovering ? "Discovering…" : "Discover Speakers"}
	</button>

	{#if error}
		<p class="mb-4 text-red-500">{error}</p>
	{/if}

	{#if devices.length === 0 && !discovering}
		<p class="text-gray-500">No speakers found yet. Click "Discover Speakers" to scan your network.</p>
	{/if}

	<div class="space-y-4">
		{#each devices as device (device.uuid)}
			<div class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
				<div class="mb-3">
					<h2 class="text-lg font-semibold">{device.name}</h2>
					{#if device.groupName}
						<p class="text-sm text-gray-500">{device.groupName}</p>
					{/if}
					<p class="text-xs text-gray-400">{device.host}</p>
				</div>

				<div class="mb-3 flex items-center gap-2">
					<button
						onclick={() => window.sonos.previous(device.host)}
						class="rounded bg-gray-100 px-3 py-1.5 text-sm hover:bg-gray-200"
						title="Previous"
					>⏮</button>
					<button
						onclick={() => window.sonos.play(device.host)}
						class="rounded bg-green-100 px-3 py-1.5 text-sm hover:bg-green-200"
						title="Play"
					>▶</button>
					<button
						onclick={() => window.sonos.pause(device.host)}
						class="rounded bg-yellow-100 px-3 py-1.5 text-sm hover:bg-yellow-200"
						title="Pause"
					>⏸</button>
					<button
						onclick={() => window.sonos.next(device.host)}
						class="rounded bg-gray-100 px-3 py-1.5 text-sm hover:bg-gray-200"
						title="Next"
					>⏭</button>
				</div>

				<div class="flex items-center gap-3">
					<span class="text-sm text-gray-600">Vol</span>
					<input
						type="range"
						min="0"
						max="100"
						value={volumes[device.host] ?? 50}
						oninput={(e) => handleVolumeChange(device.host, Number(e.currentTarget.value))}
						class="w-full"
					/>
					<span class="w-8 text-right text-sm text-gray-600">{volumes[device.host] ?? "–"}</span>
				</div>
			</div>
		{/each}
	</div>
</main>
