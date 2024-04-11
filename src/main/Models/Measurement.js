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
  time: DataTypes.INTEGER,
  temperature: DataTypes.FLOAT,
  pressure: DataTypes.FLOAT,
  velocity: DataTypes.FLOAT,
  height : DataTypes.FLOAT,
  aceleration: DataTypes.FLOAT,
  angle_x: DataTypes.FLOAT,
  angle_y: DataTypes.FLOAT,
  angle_z: DataTypes.FLOAT,
  latitude_cp: DataTypes.FLOAT,
  length_cp: DataTypes.FLOAT,
  latitude_cs: DataTypes.FLOAT,
  length_cs: DataTypes.FLOAT,
}, {
  sequelize,
  timestamps: false,
  modelName: 'measurement',
});
