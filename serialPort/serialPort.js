// Conexión Serial
const { SerialPort, DelimiterParser } = require("serialport");
class Connection {
    constructor() {
        this.port = new SerialPort({
            path: 'COM3',
            baudRate: 9600,
            autoOpen: false
        });
    }
    createSerialPort(portValue) {
        // Se crea el puerto y los eventos del puerto.
        this.port = new SerialPort({
            path: portValue,
            baudRate: 9600,
            autoOpen: false
        });
        console.log(`Port created on: ${this.port.path}`);
      //RECEPCION DE DATOS DEL ARDUINO
        // parse = port.pipe(new DelimiterParser({ delimiter: '\n' }));
        // parse.on("data", data => {
        // const Data = data.toString('utf8');
        // console.log(Data);
        // });
    };
}

module.exports = {Connection};