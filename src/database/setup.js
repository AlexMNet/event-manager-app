const mongoose = require('mongoose');

if (process.env.NODE_ENV === 'development') {
  // LOCAL DATABASE
  module.exports = function() {
    mongoose
      .connect(process.env.DATABASE_LOCAL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('LOCAL MONGO CONNECTION OPEN!!!');
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('LOCAL MONGO CONNECTION ERROR!!!!');
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };
} else {
  //ATLAS CLOUD DATABASE
  module.exports = function() {
    mongoose
      .connect(process.env.DATABASE_CLOUD, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('ATLAS MONGO CONNECTION OPEN!!!');
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('ATLAS MONGO CONNECTION ERROR!!!!');
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };
}
