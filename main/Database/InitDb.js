import { Sequelize } from "sequelize";
/**
 * Create the connection to database
 */
export const sequelize = new Sequelize('test-db', 'user', 'pass',{
    dialect:'sqlite',
    host: './main/Database/data/host.sqlite',
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}