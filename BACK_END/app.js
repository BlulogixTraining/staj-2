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

// connecting to the database
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://<???UserName>:<????Password>@cluster0.oqiqm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
    });


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});