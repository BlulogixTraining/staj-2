const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const routes = require('./routes');

// uncomment after implementing routes
// app.use('/api/', routes);
app.use(bodyParser.json());

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});