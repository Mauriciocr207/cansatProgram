import { SerialPortConnection } from "./SerialPortConnection";

export class SerialManager {
    errMsg = null;
    connections = {};    
    /**
     * 
     * @param {*} port 
     * @returns {SerialPortConnection}
     */
    getConnection(port) {
        if(!this.connections[`${port}`]) {
            const connection = new SerialPortConnection(port);
            this.connections[`${port}`] = connection;        
        }
        return this.connections[`${port}`];
    }
}