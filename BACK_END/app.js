require('dotenv').config();  // Load environment variables

const express = require('express');
const bodyParser = require('body-parser');

const { connectToDatabase } = require('./config/database.js');
const authRoutes = require('./routes/auth.routes.js');
const ruleRoutes = require('./routes/rule.routes.js');

const app = express();
app.use(bodyParser.json());
// Mount the routes
app.use('/auth', authRoutes); // Authentication routes
app.use('/rules', ruleRoutes); // Rule routes

// Error handling for unmatched routes
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 4000;
const DB_PORT = process.env.DB_PORT || 5432;

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`API listening on port ${PORT}`);
});
