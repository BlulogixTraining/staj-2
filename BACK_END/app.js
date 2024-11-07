const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { connectToDatabase } = require('./config/database.js');

// const routes = require('./routes');

// uncomment after implementing routes
// app.use('/api/', routes);
app.use(bodyParser.json());

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

const PORT = process.env.PORT || 4000;



app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`API listening on port ${PORT}`);
});