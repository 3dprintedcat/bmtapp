const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
  'electron',
  {
    minimize: () => ipcRenderer.send('minimize-window'),
    close: () => ipcRenderer.send('close-window'),
    maximize: () => ipcRenderer.send('maximize'),
    showOverlay: () => ipcRenderer.send('show-overlay')

  }
);
