const { app, BrowserWindow, ipcMain, screen, globalShortcut } = require('electron');
const path = require('path');
const express = require('express');
const server = express();
const isDev = true;
const tools = true;
let overlayWindow;

function createWindow () {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      devTools: tools
    },
    titleBarStyle: 'hidden',
    frame: false,
    icon: path.join(__dirname, 'logo.ico') // Set the icon
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

  ipcMain.on('show-overlay', (event) => {
    if (!overlayWindow) {
      overlayWindow = new BrowserWindow({
        width: width,
        height: height,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        devTools: tools
      })
      overlayWindow.loadURL(isDev ? 'http://localhost:3000/overlay.html' : `file://${path.join(__dirname, '../build/overlay.html')}`)
      
    } else {
      overlayWindow.show()
    }
  });

 if (isDev) {
  win.loadURL('http://localhost:3000');
} else {
  win.loadFile(path.join(__dirname, '../build/index.html'));
}
}

app.whenReady().then(() => {
   // Start the server
  server.use(express.static(path.join(__dirname, '../build')));
  server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });

  server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });

  createWindow();

  // Register a global shortcut for Ctrl+Shift+O to toggle the overlay
  globalShortcut.register('Control+Shift+O', () => {
    if (overlayWindow.isVisible()) {
      overlayWindow.hide();
      overlayWindow.setIgnoreMouseEvents(true);
    } else {
      overlayWindow.show();
      overlayWindow.setIgnoreMouseEvents(false);
    }
  });
}).catch((error) => {
  console.error('Failed to create window:', error);
});

app.on('will-quit', () => {
  // Unregister all shortcuts when the application is quitting
  globalShortcut.unregisterAll();
});
