import { contextBridge, ipcRenderer } from "electron";

export type SonosDeviceInfo = {
  name: string;
  host: string;
  uuid: string;
  groupName: string | undefined;
};

export type DeviceStateEvent = {
  host: string;
  state: "transportState" | "playSpeed" | "volume";
  value: any;
};

const sonosAPI = {
  discover: (): Promise<SonosDeviceInfo[]> => ipcRenderer.invoke("sonos:discover"),
  play: (host: string): Promise<boolean> => ipcRenderer.invoke("sonos:play", host),
  pause: (host: string): Promise<boolean> => ipcRenderer.invoke("sonos:pause", host),
  next: (host: string): Promise<boolean> => ipcRenderer.invoke("sonos:next", host),
  previous: (host: string): Promise<boolean> => ipcRenderer.invoke("sonos:previous", host),
  setVolume: (host: string, volume: number): Promise<boolean> => ipcRenderer.invoke("sonos:setVolume", host, volume),
  getVolume: (host: string): Promise<number> => ipcRenderer.invoke("sonos:getVolume", host),
  onDeviceStateChange: (callback: (event: DeviceStateEvent) => void) => {
    ipcRenderer.on("sonos:device-state", (_event, data) => {
      callback(data);
    });
  },
};

contextBridge.exposeInMainWorld("sonos", sonosAPI);

export type SonosAPI = typeof sonosAPI;
