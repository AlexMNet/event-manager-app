const mongoose = require('mongoose');

if (process.env.NODE_ENV === 'development') {
  // LOCAL DATABASE
  module.exports = function() {
    mongoose
      .connect('mongodb://localhost:27017/eventsApp', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
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
      .connect(
        'mongodb+srv://admin-alex:test123@hotsaucecluster.aupxg.mongodb.net/eventsAppCloud',
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        }
      )
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
