import { Sequelize } from "sequelize";
/**
 * Create the connection to database
 */
export const sequelize = new Sequelize('test-db', 'user', 'pass',{
    dialect:'sqlite',
    host: '../Database/host.sqlite',
});