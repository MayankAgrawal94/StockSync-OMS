const mongoose = require('mongoose');
const { MongoDbConfig } = require('./env.constant');

mongoose.set('strictQuery', true);

mongoose.connection.once('open', function() { 

  console. info('MongoDB event open'); 
  console.debug('MongoDB connected [%s]', MongoDbConfig.connString);

  mongoose.connection.on('connected', function() { 
      console.info('MongoDB event connected'); 
  });

  mongoose.connection.on('disconnected', function() { 
      console.warn('MongoDB event disconnected'); 
  });

  mongoose.connection.on('reconnected', function() { 
      console.info('MongoDB event reconnected');
  });

  mongoose.connection.on('error', function(err) { 
      console.error('MongoDB event error: ' + err);
  });

});

mongoose.connect( MongoDbConfig.connString, MongoDbConfig.connOptions ).then(
  () => {
    return console.log("Successfully connected to the database");
  },
  err => {
    console.error( "Could not connect to the database, Exiting now...", err); 
    process.exit();
  }
)
