import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";
import { SonosManager } from "@svrooij/sonos";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const manager = new SonosManager();
let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(import.meta.dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    mainWindow.webContents.on("did-frame-finish-load", () => {
      mainWindow.webContents.openDevTools({ mode: "detach" });
    });
  } else {
    mainWindow.loadFile(
      path.join(
        import.meta.dirname,
        `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`,
      ),
    );
  }
};

const setupDeviceListeners = () => {
  manager.Devices.forEach((device) => {
    console.log('Start listening for events from %s', device.Name);

    device.Events.on('transportState', (value) => {
      mainWindow?.webContents.send("sonos:device-state", {
        host: device.Host,
        state: "transportState",
        value: value,
      });
    });

    device.Events.on('volume', (value) => {
      mainWindow?.webContents.send("sonos:device-state", {
        host: device.Host,
        state: "volume",
        value: value,
      });
    });
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle("sonos:discover", async () => {
  try {
    await manager.InitializeWithDiscovery(10);
    setupDeviceListeners();
    return manager.Devices.map((d) => ({
      name: d.Name,
      host: d.Host,
      uuid: d.Uuid,
      groupName: d.GroupName,
    }));
  } catch (err) {
    throw new Error(`Discovery failed: ${err}`);
  }
});

ipcMain.handle("sonos:play", async (_event, host: string) => {
  const device = manager.Devices.find((d) => d.Host === host);
  if (!device) throw new Error(`Device not found: ${host}`);
  return device.Play();
});

ipcMain.handle("sonos:pause", async (_event, host: string) => {
  const device = manager.Devices.find((d) => d.Host === host);
  if (!device) throw new Error(`Device not found: ${host}`);
  return device.Pause();
});

ipcMain.handle("sonos:next", async (_event, host: string) => {
  const device = manager.Devices.find((d) => d.Host === host);
  if (!device) throw new Error(`Device not found: ${host}`);
  return device.Next();
});

ipcMain.handle("sonos:previous", async (_event, host: string) => {
  const device = manager.Devices.find((d) => d.Host === host);
  if (!device) throw new Error(`Device not found: ${host}`);
  return device.Previous();
});

ipcMain.handle("sonos:setVolume", async (_event, host: string, volume: number) => {
  const device = manager.Devices.find((d) => d.Host === host);
  if (!device) throw new Error(`Device not found: ${host}`);
  return device.SetVolume(volume);
});

ipcMain.handle("sonos:getVolume", async (_event, host: string) => {
  const device = manager.Devices.find((d) => d.Host === host);
  if (!device) throw new Error(`Device not found: ${host}`);
  const response = await device.RenderingControlService.GetVolume({ InstanceID: 0, Channel: "Master" });
  return response.CurrentVolume;
});
