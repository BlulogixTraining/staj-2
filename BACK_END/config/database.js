const { DataSource } = require('typeorm');
require('dotenv').config();

const entities = [
  	require('../entities/UserSchema.js'),
  	// add other entities
]

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: entities,
  ssl: true,
  extra: {
  	ssl: {
      "rejectUnauthorized":false
  	}
  } 
});

async function connectToDatabase() {
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

module.exports = { connectToDatabase, AppDataSource }