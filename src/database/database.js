import { Sequelize } from "sequelize";

/*export const sequelize = new Sequelize(
    'pruebacondatoscompletos',  //Nombre de la base de datos
    'root',                     //Usuario por defecto
    '1234',                     //Contraseña asignada para el acceso en la base de datos
    {
    host: "localhost",
    dialect: "mysql"
});*/

//Conexion con sqlite


export const sequelize = new Sequelize('test-db', 'user', 'pass',{
    dialect:'sqlite',
    host:'./src/dbsave/dev.sqlite'
}); 