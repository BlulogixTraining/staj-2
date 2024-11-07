//  Initialize the pg package and get the Client from it.
const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

//Database connection configuration
const client = new Client({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
});
//Connect to the database
const connectToDatabase = async () => {
	client
	.connect()
		.then(() => {
			console.log('Connected to PostgreSQL database');
		})
		.catch((err) => {
			console.error('Error connecting to PostgreSQL database', err);
	});
}

module.exports = { client, connectToDatabase };
