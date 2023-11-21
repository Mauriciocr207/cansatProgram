// Módulos de electron
import { app, ipcMain, BrowserWindow } from 'electron';
import serve from 'electron-serve';
import {createWindow} from './helpers/create-window';
import { SerialManager } from './Serial/SerialManager';

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}


const serialManager = new SerialManager();
app.whenReady()
    .then(() => {
      const win = createWindow('main', {
        backgroundColor: '#121212',
        width: 1500,
        height: 800,
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#000000',
            symbolColor: '#ffffff',
        },
        webPreferences: {
            // preload: path.join(__dirname, '../app/preload.js'),
            contextIsolation: false,
            nodeIntegration: true,
        }
    });
      if (isProd) {
        win.loadURL('app://./home.html');
      } else {
        const port = process.argv[2];
        win.loadURL(`http://localhost:${port}/home`);
        win.webContents.openDevTools();
      }

      const sendData = (channel, data) => win.webContents.send(channel, data);   
      // MacOS
      app.on('activate', () => (BrowserWindow.getAllWindows().length === 0) ? createWindow() : false);
      // Events
      ipcMain.on('serial:connection:open',  (event, data) => {
        const {port, id} = data;
        console.log(`abriendo puerto: ${port}`);
        serialManager.getConnection(port).open()
          .then(() => {
            console.log("se abrió el puerto: ", port);
            sendData(`serial:connection:open:${id}`, {
              status: true,
              port: port,
              message: "connected port",
            });
          })
          .catch((err) => {
            console.log(`${port} ${err}`);
            sendData(`serial:connection:open:${id}`, {
              status: false,
              port: port,
              message: err,
            });
          });
      });
      ipcMain.on('serial:connection:close', (event, data) => {
        const {port, id} = data;
        console.log(`cerrando puerto: ${port}`);
        serialManager.getConnection(port).close()
          .then(() => {
            console.log("puerto cerrado: ", port);
            sendData(`serial:connection:close:${id}`, {
              status: true,
              port: port,
              message: "closed port",
            });            
          })
          .catch((err) => {
            console.log(`${port} ${err}`, );
            sendData(`serial:connection:close:${id}`, {
              status: false,
              port: port,
              message: err,
            });           
          });    
      });
      ipcMain.on('arduino:data', (event,data) => {
        // 
      })
    })
    .catch( err => {
      console.log(err);
    })
app.on('window-all-closed', () => {
  app.quit();
});