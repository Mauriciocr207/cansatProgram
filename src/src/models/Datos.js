import {DataTypes} from 'sequelize'
import {sequelize} from '../database/database.js'

export const Datos = sequelize.define('DatosRecibidos',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    time:{
        type: DataTypes.INTEGER,
    },
    temperatura:{
        type: DataTypes.INTEGER,
    },
    presion:{
        type: DataTypes.INTEGER,
    },
    humedad:{
        type: DataTypes.INTEGER,
    },
    velocidad:{
        type: DataTypes.INTEGER,
    }
},
{
    timestamps: false    
});