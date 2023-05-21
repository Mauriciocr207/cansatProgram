import {DataTypes} from 'sequelize'
import {sequelize} from '../database/database.js'

/**
 * Tiempo
 * Temperatura
 * Presion
 * Humedad
 * Velocidad
 * Aceleracion,Ejex,y,z
 * Yaw,pitch, roll - Flotantes
 * 
 */



export const Datos = sequelize.define('DatosRecibidos',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Time:{
        type: DataTypes.INTEGER,
    },
    Temperatura:{
        type: DataTypes.FLOAT,
    },
    Presion:{
        type: DataTypes.FLOAT,
    },
    Humedad:{
        type: DataTypes.FLOAT,
    },
    Velocidad:{
        type: DataTypes.FLOAT,
    },
    Longitud:{
        type: DataTypes.FLOAT,
    },
    Latitud:{
        type: DataTypes.FLOAT,  
    },
    Altitud:{
        type: DataTypes.FLOAT,
    },
    AccelX:{
        type: DataTypes.FLOAT,
    },
    AccelY:{
        type: DataTypes.FLOAT,
    },
    AccelZ:{
        type: DataTypes.FLOAT,
    },
    Yaw:{
        type: DataTypes.FLOAT,
    },
    Pitch:{
        type: DataTypes.FLOAT,
    },
    Roll:{
        type: DataTypes.FLOAT,
    },
    

},
{
    timestamps: false    
});