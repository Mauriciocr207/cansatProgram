// Módulos de electron
import { app, ipcMain, BrowserWindow } from "electron";
import serve from "electron-serve";
import { Connection } from "../serialPort/serialPort";
const connections = {};

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    backgroundColor: "#121212",
    width: 1500,
    height: 800,
    titleBarStyle: "hidden",
    titleBarOverlay: {
      // color: "#000000",
      // symbolColor: "#ffffff",
    },
    webPreferences: {
      // preload: path.join(__dirname, '../app/preload.js'),
      contextIsolation: false,
      nodeIntegration: true,
    },
  });
  return mainWindow;
}


app.whenReady()
    .then(() => {
      const win = createWindow();
      if (isProd) {
        mainWindow.loadURL("app://./home.html");
      } else {
        const port = process.argv[2];
        win.loadURL(`http://localhost:${port}/home`);
        win.webContents.openDevTools();
      }

      const sendData = (channel, data) => win.webContents.send(channel, data);
      // MacOS
      app.on("activate", () =>
        BrowserWindow.getAllWindows().length === 0 ? createWindow() : false
      );

      // Events
      ipcMain.on("wantToOpenConnection", (event, data) => {
        const dataPort = `${data.port}`.split(" ").join(""); // Se limpia el string el puerto de espacios
        if (!connections.hasOwnProperty(`connection_${data.id}`))
          connections[`connection_${data.id}`] = new Connection(dataPort);
        const connection = connections[`connection_${data.id}`];
        // Se cierra la conexión antes de abrir otra
        if (connection.port.isOpen) {
          connection.port.close((err) => {
            if (err) console.log("Can´t close port", err);
            else {
              console.log("Port closed");
              sendData(`openedConnection_${data.id}`, false);
            }
          });
        }

        // Se crea puerto serial y se abre la conexión
        connection.createSerialPort(dataPort);
        connection.port.open(function (err) {
          if (err) {
            console.log(
              `Error opening port on connection_${data.id} ->`,
              err.message
            );
            sendData(`openedConnection_${data.id}`, false);
          } else {
            console.log("Port connected");
            sendData(`openedConnection_${data.id}`, true);
          }
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
app.on("window-all-closed", () => {
  app.quit();
});
