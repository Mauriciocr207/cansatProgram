const {
    createClient
} = require('redis');

//redis-18221.c16.us-east-1-2.ec2.cloud.redislabs.com:18221
/**
 * 
 * 
 * 
const dummyObject = [
    {
        data: {"time":19109,"temperatura":38,"presion":2,"humedad":3,"velocidad":4},
        date: 'hoy'
    },
    {
        data: {"time":19109,"temperatura":38,"presion":2,"humedad":3,"velocidad":4},
        date: 'hoy'
    },
    {
        data: {"time":19109,"temperatura":38,"presion":2,"humedad":3,"velocidad":4},
        date: 'hoy'
    },
    {
        data: {"time":19109,"temperatura":38,"presion":2,"humedad":3,"velocidad":4},
        date: 'hoy'
    }
]
*/

class RedisConnection {
    constructor() {
        this.client =  createClient({
            url: 'redis://:7cpcZ6VlE9G68m0b7CHRJTHFAoXsVIO8@redis-18221.c16.us-east-1-2.ec2.cloud.redislabs.com:18221'
        });

        this.event = [];
    }

    async flushData() {
        await this.client.flushDb();
    }

    async connect() {
        await this.client.connect();
        console.log('[redis]: connected');
    }

    async getData() {
        return await this.client.hGetAll('data');
    }

    async setData(value) {
        this.client.hSet('data', (new Date()).toISOString(), JSON.stringify(value));
    }

    async addDataToEvent(data) {
        this.event.push({
            data,
            date: (new Date()).toISOString()
        });
    }

    async saveEvent(campo) {
        this.client.hSet('eventoPrueba', campo, JSON.stringify(this.event))
    }

}

const redisClient = new RedisConnection();
module.exports = redisClient;