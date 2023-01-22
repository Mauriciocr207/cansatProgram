const {contextBridge, ipcRenderer} = require('electron');

// Se evita la exposición del IpcRenderer al window
contextBridge.exposeInMainWorld('electronApi', {
    send: (channel, data) => ipcRenderer.send(channel, data),
    handle: (channel, callback) => ipcRenderer.on(channel, callback)
});