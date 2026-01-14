const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    readData: () => ipcRenderer.invoke('read-data'),
    saveData: (key, data) => ipcRenderer.invoke('save-data', key, data),
    saveImage: (data) => ipcRenderer.invoke('save-image', { data }),
    minimize: () => ipcRenderer.send('window-minimize'),
    maximize: () => ipcRenderer.send('window-maximize'),
    close: () => ipcRenderer.send('window-close'),
    openExternal: (url) => ipcRenderer.invoke('open-external', url)
});
