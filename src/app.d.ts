// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

declare global {
	interface SonosDeviceInfo {
		name: string;
		host: string;
		uuid: string;
		groupName: string | undefined;
	}

	interface SonosAPI {
		discover(): Promise<SonosDeviceInfo[]>;
		play(host: string): Promise<boolean>;
		pause(host: string): Promise<boolean>;
		next(host: string): Promise<boolean>;
		previous(host: string): Promise<boolean>;
		setVolume(host: string, volume: number): Promise<boolean>;
		getVolume(host: string): Promise<number>;
		onDeviceStateChange(callback: (event: DeviceStateEvent) => void): void;
	}

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Window {
		sonos: SonosAPI;
	}
}

export {};
