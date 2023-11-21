import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../Database/InitDb.js';
/**
 * Create a class Measurement that extends from sequelize Model
 */
class Measurement extends Model {
    static async save(object) {
        const {time, temperatura, presion, humedad, velocidad} = object;
        try {
            await this.create({
                time,
                temperatura,
                presion,
                humedad,
                velocidad
            });
            console.log('Guardado correctamente');
        } catch (error) {
            console.log('error al subir los datos', error);
        }
    }
    static async getAll(field){
        try {
            const project =  await this.findAll({
                attributes:[field]
            })
            console.log(project);
        } catch (error) {
            console.log('No se encuentra en la base de datos', error);
        }
    };
}
/**
 * Initialize the Model Measurement
 */
Measurement.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    time:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    temperatura:{
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    presion:{
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    humedad:{
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    velocidad:{
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    longitud:{
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    latitud:{
        type: DataTypes.FLOAT, 
        allowNull: true, 
    },
    altitud:{
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    accelX:{
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    accelY:{
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    accelZ:{
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    yaw:{
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    pitch:{
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    roll:{
        type: DataTypes.FLOAT,
        allowNull: true,
    },   
},
{
    sequelize: sequelize,
    timestamps: false,
});

/**
 * Syncronize with database
 */
Measurement.sync({force:true})
    .then(() => {
        console.log("Measurement table created");
        // create the first register
        Measurement.create({time: Date.now()});
    })
    .catch(error => console.error("Error creating measurement table: ", error));
export {
    Measurement
};