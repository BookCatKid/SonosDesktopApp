import { writable } from 'svelte/store';

export const devices = writable([]);
export const discovering = writable(false);
export const error = writable("");
export const volumes = writable({});

export async function discover() {
	discovering.set(true);
	error.set("");
	try {
		const result = await window.sonos.discover();
		devices.set(result);
		const volumeMap = {};
		for (const device of result) {
			volumeMap[device.host] = await window.sonos.getVolume(device.host);
		}
		volumes.set(volumeMap);
	} catch (err) {
		error.set(String(err));
	} finally {
		discovering.set(false);
	}
}

export async function handleVolumeChange(host, value) {
	volumes.update(v => ({ ...v, [host]: value }));
	await window.sonos.setVolume(host, value);
}

// Set up real-time event listeners
export function initializeEventListeners() {
    window.sonos.onDeviceStateChange((event) => {
        if (event.state === 'volume') {
            volumes.update(v => ({ ...v, [event.host]: event.value }));
        }
    });
}
