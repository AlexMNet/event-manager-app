require('dotenv').config();
const express = require('express');

const app = express();
const eventRouter = require('./routes/eventRoutes');

const port = process.env.PORT || 3000;

//Middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//==================================================
// DATABASE
//==================================================
const dbSetup = require('./database/setup');

dbSetup();

//==================================================
// Routes
//==================================================

//Event Routes
app.use('/events', eventRouter);

//Server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${port}...`);
});
