//  Initialize the pg package and get the Client from it.
const { Client } = require('pg');

//Database connection configuration
const client = new Client({
	user: 'postgres',
	password: 'postgres',
	host: 'localhost',
	port: 5432,
	database: 'staj-2',
});
//Connect to the database
client
.connect()
	.then(() => {
		console.log('Connected to PostgreSQL database');
	})
	.catch((err) => {
		console.error('Error connecting to PostgreSQL database', err);
});

