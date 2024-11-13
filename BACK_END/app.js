const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { connectToDatabase } = require('./config/database.js');
const authRoutes = require('./routes/auth.routes.js');

// const routes = require('./routes');

// uncomment after implementing routes
// app.use('/api/', routes);
app.use(bodyParser.json());

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 4000;



app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`API listening on port ${PORT}`);
});