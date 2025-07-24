const { app, BrowserWindow, ipcMain, nativeTheme } = require("electron");
const path = require("node:path");
let bluetoothPinCallback;
let selectBluetoothCallback;
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "./src/preload.js"),
    },
  });
  // 选择蓝牙配对
  win.webContents.on("select-bluetooth-device", (event, devices, callback) => {
    event.preventDefault();
    console.log("devices", devices);
    selectBluetoothCallback = callback;
  });
  win.webContents.session.setBluetoothPairingHandler((details, callback) => {
    bluetoothPinCallback = callback;
    // Send a message to the renderer to prompt the user to confirm the pairing.
    win.webContents.send("bluetooth-pairing-request", details);
  });
  win.loadFile("index.html");
};

//取消蓝牙配对
ipcMain.on("cancel-bluetooth-request", () => {
  selectBluetoothCallback("");
});

// 渲染进程告诉主进程用户的蓝牙配对结果，主进程再把结果反馈给 Electron 蓝牙系统
ipcMain.on("bluetooth-pairing-response", (event, response) => {
  bluetoothPinCallback(response);
});

// 修改主题色
ipcMain.handle("dark-mode:toggle", () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = "light";
  } else {
    nativeTheme.themeSource = "dark";
  }

  return nativeTheme.shouldUseDarkColors;
});

ipcMain.handle("dark-mode:system", () => {
  nativeTheme.themeSource = "system";
});

app.whenReady().then(() => {
  // console.log(process.platform);
  ipcMain.handle("ping", () => "pong");
  createWindow();
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
