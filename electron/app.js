const { app, BrowserWindow, ipcMain} = require('electron');
const {Connection} = require('../serialPort/serialPort')
const path = require('path');
const connection = new Connection();
const createWindow = () => {
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
            preload: path.join(__dirname, './preload.js'),
            contextIsolation: true,
            nodeIntegration: true,
        }
    });
    mainWindow.loadFile(
        require('path').join(__dirname, "../public/index.html")
    );
    return mainWindow
};

if(process.env.NODE_ENV !== 'production') {
    require('electron-reload')(path.join(__dirname, '../public/index.html'), {
        electron: path.join(__dirname, './app.js')
    });
};

app.whenReady().then( () => {
    const win = createWindow();
    win.webContents.openDevTools();
    const sendData = (channel, data) => win.webContents.send(channel, data);   
    // MacOS
    app.on('activate', () => (BrowserWindow.getAllWindows().length === 0) ? createWindow() : false);
    ipcMain.on('wantToOpenConnection', (event, data) => {
        // Se cierra la conexión antes de abrir otra
        if(connection.port.isOpen) {
            connection.port.close((err) => {
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
});

// Windows y Linux
app.on('window-all-closed', () => (process.platform !== 'darwin') ? app.quit() : false);