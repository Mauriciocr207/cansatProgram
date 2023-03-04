const { BrowserWindow } = require('electron');
const path = require('path');
export default function createWindow(){
    const mainWindow = new BrowserWindow({
        backgroundColor: '#121212',
        width: 1500,
        height: 800,
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#000000',
            symbolColor: '#ffffff',
        },
        webPreferences: {
            preload: path.join(__dirname, '/preload.js'),
            contextIsolation: false,
            nodeIntegration: true,
        }
    });
    return mainWindow
  };