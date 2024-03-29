import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const {
    DB_STORAGE
} = process.env;

/**
 * Create the connection to database
 */
export const sequelize = new Sequelize({
    dialect:'sqlite',
    host: DB_STORAGE,
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}