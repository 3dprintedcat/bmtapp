const { app, BrowserWindow,ipcMain  } = require('electron')
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    titleBarStyle: 'hidden',
    

    frame: false
  })
  ipcMain.on('minimize-window', (event) => {
  win.minimize();
});

ipcMain.on('close-window', (event) => {
  win.close();
});

ipcMain.on('maximize', (event) => {
  win.maximize();
});

  win.loadURL('http://localhost:3000')
}

app.whenReady().then(createWindow).catch((error) => {
  console.error('Failed to create window:', error);
});

