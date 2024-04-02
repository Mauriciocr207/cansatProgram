import { BrowserWindow } from 'electron';
import { SerialPort, DelimiterParser } from 'serialport';
import Measurement from '../Models/Measurement';


export class SerialPortConnection {
    baudRateValue = 9600;
    serial;
    constructor(port) {
        this.serial = new SerialPort({
            path: port,
            baudRate: this.baudRateValue,
            autoOpen: false,
        });
        const parse = this.serial.pipe(new DelimiterParser({ delimiter: '\n' }));
        parse.on('data', (data) => {
            let jsonData = data.toString();                                          //Convert to string
            try {
                jsonData = jsonData.replace(/\r?\n|\r/g, "");                               //remove '\r' from this String
                jsonData = JSON.stringify(data);                                        // Convert to JSON
                jsonData = JSON.parse(data);                                            // Convert to JS object
                // this.saveOnDB(jsonData);
                this.sendToWindow(1, jsonData);
            } catch (err) {
                console.log(`${err.message} : ${jsonData}`); 
            }                                                                             
        });
    }

    open() {
        try {
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

    close() {
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

    sendToWindow(windowId, data) {
        BrowserWindow.fromId(windowId).webContents.send('arduino:data', data);     // Send to principal window
    }

    saveOnDB(data) {
        const {
            time,
            giro,
            temp,
            pres,
            alt,
            gps
        } = data;
        Measurement.create({
            presion: pres,
            temperatura: temp,
            velocidad: 0,
            yaw: giro[0],
            tiempo: time,
            humedad: 0,
            longitud: gps[0],
            latitud: gps[1],
            altitud: alt,
            accelX: 0,
            accelY: 0,
            accelZ: 0,
            pitch: giro[1],
            roll: giro[2],
        }).catch(()=>{});
    }
    
};