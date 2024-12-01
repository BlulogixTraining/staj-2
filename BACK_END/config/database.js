const { DataSource } = require('typeorm');
require('dotenv').config();

const glob = require('glob');

// Dynamically require all entities in the /entity folder
const entities = glob.sync(__dirname + '/../entities/**/*.js').map(file => require(file));


const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
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