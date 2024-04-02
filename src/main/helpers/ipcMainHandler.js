import { SerialPort } from "serialport";
import { SerialManager } from "../Serial/SerialManager";
import { BrowserWindow } from "electron";
const serialManager = new SerialManager();

export class ipcMainHandler {

    static serialConnectionOpen(e, data) {
        const { port, id } = data;
        let res = {};
        console.log(port);
        serialManager.getConnection(port).open()
          .then(() => {
            console.log(`Puerto ${port} abierto`);
            res = {port, status: true, message: "Conectado correctamente"};
          })
          .catch((err) => {
            console.log(`No se pudo abrir el puerto ${port}: ${err}`);
            res = {port, status: false, message: `Hubo un error. ${err}`};
          }).finally(() => {
            BrowserWindow.fromId(1).webContents.send(`serial:open:${id}`, res);
          });
    }

    static serialConnectionClose(e, data) {
        const { port, id } = data;
        let res = {};
        serialManager.getConnection(port).close()
          .then(() => {
            console.log("Puerto cerrado: ", port);
            res = {port, status: true, message: "Puerto cerrado"};
          })
          .catch((err) => {
            console.log(`Error al cerrar el puerto ${port}: ${err}`);
            res = {port, status: false, message: `Hubo un error. ${err}`};
          }).finally(() => {
            BrowserWindow.fromId(1).webContents.send(`serial:close:${id}`, res);
          });

        
    }

    static serialListPorts() {
      SerialPort.list().then((ports) => {
        BrowserWindow.fromId(1).webContents.send('serial:list-ports', ports);
      })
    }
}