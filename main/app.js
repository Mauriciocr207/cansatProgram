// Módulos de electron
import { app, ipcMain, BrowserWindow } from 'electron';
import serve from 'electron-serve';
import { Connection } from '../serialPort/serialPort';
const connection = new Connection();

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

function createWindow(){
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
            // preload: path.join(__dirname, '../app/preload.js'),
            contextIsolation: false,
            nodeIntegration: true,
        }
    });
    return mainWindow
  };

app.whenReady()
    .then(() => {
      const win = createWindow();
      win.webContents.openDevTools();

      if (isProd) {
        mainWindow.loadURL('app://./home.html');
      } else {
        const port = process.argv[2];
        win.loadURL(`http://localhost:${port}/home`);
        win.webContents.openDevTools();
      }

      const sendData = (channel, data) => win.webContents.send(channel, data);   
      // MacOS
      app.on('activate', () => (BrowserWindow.getAllWindows().length === 0) ? createWindow() : false);
      // Events
      ipcMain.on('wantToOpenConnection', (event, data) => {
          // Se cierra la conexión antes de abrir otra
          if(connection.port.isOpen) {
              connection.port.close( err => {
                  if (err) console.log("Can´t close port");
                  else console.log("Port closed");
              });
          };

          // Se crea puerto serial y se abre la conexión
          connection.createSerialPort(`${data}`.split(" ").join(""));
          connection.port.open( function (err) {
              if (err) {
                  console.log('Error opening port -> ', err.message);
                  sendData('openedConnection', false);
              }
              else {
                  console.log("Port connected");
                  sendData('openedConnection', true);
              }
          });
      });
    })
    .catch( err => {
      console.log(err);
    })
app.on('window-all-closed', () => {
  app.quit();
});