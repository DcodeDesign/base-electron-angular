import {app, BrowserWindow, ipcMain} from 'electron';
import {autoUpdater, AppImageUpdater, MacUpdater, NsisUpdater } from 'electron-updater';
import * as path from 'path';
import * as fs from 'fs';
import * as url from 'url';

// Initialize remote module
require('@electron/remote/main').initialize();

let mainWindow: BrowserWindow = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {

  // const size = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: 660,
    height: 360,
    backgroundColor: '#ffffff',
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve),
      contextIsolation: false,
      enableRemoteModule : true
    },
    frame: false
  });

  if (serve) {
    mainWindow.webContents.openDevTools();

    require('electron-reload')(__dirname, {
      electron: require(path.join(__dirname, '/../node_modules/electron'))
    });

    mainWindow.loadURL('http://localhost:4200');
  } else {
    mainWindow.webContents.openDevTools();

    let pathIndex = './index.html';

    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
      pathIndex = '../dist/index.html';
    }

    mainWindow.once('ready-to-show', () => {
      autoUpdater.checkForUpdatesAndNotify();
    });

    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, pathIndex),
      protocol: 'file:',
      slashes: true
    }));
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', _ => {
    mainWindow = null;
  });

  return mainWindow;
}

try {
  app.on('ready', () => setTimeout(createWindow, 400));

  app.on('window-all-closed', () => {
    console.log(process.platform)
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  ipcMain.on('app_version', (event) => {
    event.sender.send('app_version', { version: app.getVersion() });
  });

  autoUpdater.on('update-available', () => {
    mainWindow.webContents.send('update_available');
  });

  autoUpdater.on('update-downloaded', () => {
    mainWindow.webContents.send('update_downloaded');
  });

  ipcMain.on('restart_app', () => {
    autoUpdater.quitAndInstall();
  });

} catch (e) {
  throw e;
}
