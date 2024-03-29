import { SerialManager } from "../Serial/SerialManager";
import { BrowserWindow } from "electron";
const serialManager = new SerialManager();

export class ipcMainHandler {

    static serialConnectionOpen(e, data) {
        const { port, id } = data;
        serialManager.getConnection(port).open()
          .then(() => {
            console.log(`Puerto ${port} abierto`);
            BrowserWindow.fromId(1).webContents.send(`serial:connection:open:${id}`, {
              status: true,
              port: port,
              message: "Connected",
            });
          })
          .catch((err) => {
            console.log(`No se pudo abrir el puerto ${port}: ${err}`);
            BrowserWindow.fromId(1).webContents.send(`serial:connection:open:${id}`, {
              status: false,
              port: port,
              message: err,
            });
          });
    }

    static serialConnectionClose(e, data) {
        const { port, id } = data;
        serialManager.getConnection(port).close()
          .then(() => {
            console.log("Puerto cerrado: ", port);
            BrowserWindow.fromId(1).webContents.send(`serial:connection:close:${id}`, {
              status: true,
              port: port,
              message: "closed port",
            });
          })
          .catch((err) => {
            console.log(`Error al cerrar el puerto ${port}: ${err}`);
            BrowserWindow.fromId(1).webContents.send(`serial:connection:close:${id}`, {
              status: false,
              port: port,
              message: err,
            });
          });
    }
}