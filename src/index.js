require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const app = express();
const eventRouter = require('./routes/eventRoutes');

const port = process.env.PORT || 3000;

//Middleware
// eslint-disable-next-line no-console
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

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
