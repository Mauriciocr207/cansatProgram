// Módulos de electron
import { app, ipcMain, BrowserWindow } from 'electron';
import serve from 'electron-serve';
import { Connection } from '../serialPort/serialPort';
import createWindow from './helpers/create-window';



const connections = {}

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}



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
      ipcMain.on('wantToOpenConnection', (event, data) => {
        const dataPort = `${data.port}`.split(" ").join(""); // Se limpia el string el puerto de espacios
        if( !connections.hasOwnProperty( `connection_${data.id}` ) ) connections[`connection_${data.id}`] = new Connection(dataPort);
        const connection = connections[`connection_${data.id}`];
        function closePort(con) {
          con.port.close( err => {
            if (err) console.log("Cant close port", err.message);
            else {
              console.log("Port closed");
              sendData(`openedConnection_${data.id}`, false);
            }
        });
        }
          // Se cierra la conexión antes de abrir otra
          if(connection.port.isOpen) {
              closePort(connection);
          } else {
            // Se crea puerto serial y se abre la conexión
            closePort(connection);
            connection.createSerialPort(dataPort);
            connection.port.open( function (err) {
                if (err) {
                    console.log(`Error opening port on connection_${data.id} ->`, err.message);
                    sendData(`openedConnection_${data.id}`, false);
                }
                else {
                    console.log("Port connected");
                    sendData(`openedConnection_${data.id}`, true);
                }
            });
          };         
      });
      ipcMain.on('Arduino:data', (event,data) => {
        const {idConnection} = data;
        const connection = connections[`connection_${idConnection}`];
        if(connection !== undefined) {
          const port = connection.port;
          const msg = data.message;
          port.write(Buffer.from(msg));
        }
      })
    })
    .catch( err => {
      console.log(err);
    })
app.on('window-all-closed', () => {
  app.quit();
});