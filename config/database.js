import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 100, // Increase the maximum number of connections
    min: 0,
    acquire: 30000, // Increase the timeout duration (in ms)
    idle: 10000, // Connection is released after being idle for 10 seconds
  },
});

try {
  await sequelize.authenticate();
  console.log('Database connected...');
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

export default sequelize;
