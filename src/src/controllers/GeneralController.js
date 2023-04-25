import { Datos } from "../models/Datos.js";
import { sequelize } from "../database/database.js";

export async function DbConnection(){
    try {
        await sequelize.sync({force:false});
        console.log("Se conecto con exito");
    } catch (error) {
        console.log('Error al intentar la conexion',error);
    }
}

export async function CreateData(object){
    const {time, temperatura, presion, humedad, velocidad} = object;
    try {
        await Datos.create({
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


//Si funciona, solo hay que pasarle el string de que dato de la tabla
// se requiere, entre las opciones está:
// 'time', 'temperatura', 'humedad', 'presion', 'velocidad'

export async function FindData(TipoDeDato){
    try {
        const project =  await Datos.findAll({
            attributes:[TipoDeDato]
        })
        console.log(project);
    } catch (error) {
        console.log('No se encuentra en la base de datos', error);
    }
};