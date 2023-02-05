const {contextBridge, ipcRenderer} = require('electron');
const jsontToCsv = require('./jsonToCsv');

// Se evita la exposición del IpcRenderer al window
contextBridge.exposeInMainWorld('electronApi', {
    send: (channel, data) => ipcRenderer.send(channel, data),
    handle: (channel, callback) => ipcRenderer.on(channel, callback)
});

