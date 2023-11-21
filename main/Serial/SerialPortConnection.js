// Model
import { Measurement } from '../Models/Measurement';
// Conexión Serial
import { BrowserWindow } from 'electron';
import { SerialPort, DelimiterParser } from 'serialport';

export class SerialPortConnection {
    baudRateValue = 115200;
    serial;
    constructor(port) {
        this.serial = new SerialPort({
            path: port,
            baudRate: this.baudRateValue,
            autoOpen: false,
        });
    }
    /**
     * 
     * @returns {Promise}
     */
    open() {
        try {
            const parse = this.serial.pipe(new DelimiterParser({ delimiter: '\n' }));
            parse.on('data', (data) => {
                let jsonData = data.toString();                                                 //Convert to string
                    jsonData = jsonData.replace(/\r?\n|\r/g, "");                               //remove '\r' from this String
                    try {
                        jsonData = JSON.stringify(data);                                        // Convert to JSON
                        jsonData = JSON.parse(data);                                            // Convert to JS object
                        Measurement.save(jsonData);
                        BrowserWindow.fromId(1).webContents.send('arduino:data', jsonData);     // Send to principal window
                    } catch (err) {
                        console.log(`${err.message} : ${jsonData}`); 
                    }                                                                             
            });
            return new Promise((res, rej) => {
                this.serial.open(function(err) {
                    if(err) {
                        rej(err.message)
                    } else {
                        res();
                    }
                });
            });
        } catch (error) {
            this.errMsg = error;
        }
    };
    write(data) {
        try {
            this.serial.write(Buffer.from(data));
        } catch (error) {
            this.errMsg = error.message;
        }
    }
    /**
     * 
     * @param {*} callback 
     * @returns {Promise}
     */
    close(callback) {
        try {
            return new Promise((res, rej) => {
                this.serial.close(function(err) {
                    if(err) {
                        rej(err.message)
                    } else {
                        res();
                    }
                });
            });
        } catch (error) {
            this.errMsg = error;
        }
    }
    hasError() {
        return this.errMsg !== null;
    }
    getError() {
        return this.errMsg;
    }
};