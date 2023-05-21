// Conexión Serial
import { SerialPort, DelimiterParser } from "serialport";
import { BrowserWindow } from 'electron';
const baudRateValue = 115200;

export class Connection {
    constructor(port) {
        this.port = new SerialPort({
            path: port,
            baudRate: baudRateValue,
            autoOpen: false
        });
    };

    // Métodos
    createSerialPort(portValue) {
        // Se crea el puerto y los eventos del puerto.
        this.port = new SerialPort({
            path: portValue,
            baudRate: baudRateValue,
            autoOpen: false
        });
        console.log(`Port created on: ${this.port.path}`);
        
        // Conexion a la Base de Datos
        DbConnection();
      
        // RECEPCION DE DATOS DEL ARDUINO
        const parse = this.port.pipe(new DelimiterParser({ delimiter: '\n' }));
        parse.on('data', (data) => {
            console.log("en parse");
            let jsonData = data.toString();                                         //Convert to string
                jsonData = jsonData.replace(/\r?\n|\r/g, "");                     //remove '\r' from this String
                try {
                    jsonData = JSON.stringify(data); // Convert to JSON
                    jsonData = JSON.parse(data); // Convert to JS object
                    BrowserWindow.fromId(1).webContents.send('Arduino:data', jsonData);     // Send to principal window
                    console.log("enviando datos", jsonData);
                } catch (err) {
                    // console.log(`${err.message} : ${jsonData}`); 
                }                                                                                    
        });
    };
};