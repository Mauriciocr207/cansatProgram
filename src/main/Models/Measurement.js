import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../Database/InitDb.js';

export default class Measurement extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
  /**
   * 
   * @param {Object} measurement to insert
   */
  static async save(measurement) {
    const {time, temperatura, presion, humedad, velocidad} = measurement;
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
  /**
   * 
   * @param {int} field   field to search
   */
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

Measurement.init({
  tiempo: DataTypes.INTEGER,
  temperatura: DataTypes.FLOAT,
  presion: DataTypes.FLOAT,
  humedad: DataTypes.FLOAT,
  velocidad: DataTypes.FLOAT,
  longitud: DataTypes.FLOAT,
  latitud: DataTypes.FLOAT,
  altitud: DataTypes.FLOAT,
  accelX: DataTypes.FLOAT,
  accelY: DataTypes.FLOAT,
  accelZ: DataTypes.FLOAT,
  yaw: DataTypes.FLOAT,
  pitch: DataTypes.FLOAT,
  roll: DataTypes.FLOAT
}, {
  sequelize,
  timestamps: false,
  modelName: 'Measurement',
});
