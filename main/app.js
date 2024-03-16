// Módulos de electron
import { app, ipcMain, BrowserWindow } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers/create-window";
import { ipcMainHandler } from "./helpers/ipcMainHandler";
import { sequelize } from "./Database/InitDb";
import { Measurement } from "./Models/measurement";

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

app.whenReady()
    .then(() => sequelize.sync({force:true}))
    .then((option) => {
      console.log(option);
      const mainWindow = createWindow("main", {
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
        mainWindow.loadURL("app://./home.html");
      } else {
        const port = process.argv[2];
        mainWindow.loadURL(`http://localhost:${port}/home`);
        mainWindow.webContents.openDevTools();
      }

      // MacOS
      app.on("activate", () =>
        BrowserWindow.getAllWindows().length === 0 ? createWindow() : false
      );

      // Events
      ipcMain.on("serial:connection:open", ipcMainHandler.serialConnectionOpen);
      ipcMain.on("serial:connection:close", ipcMainHandler.serialConnectionClose);
      ipcMain.on("arduino:data", (event, data) => {
        //
      });
    })
    .catch((err) => {
      console.log(err);
    });

app.on("window-all-closed", () => {
  app.quit();
});
