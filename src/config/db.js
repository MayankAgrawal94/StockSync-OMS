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

let isConnected = false;  // To prevent multiple connections

const connectDB = async () => {
    if (isConnected) {
        console.log('Already connected to MongoDB.');
        return;
    }

    try {
        await mongoose.connect(MongoDbConfig.connString, MongoDbConfig.connOptions);
        isConnected = true;
        console.log('Connected to MongoDB.');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};

const disconnectDB = async () => {
    if (isConnected) {
        await mongoose.connection.close();
        isConnected = false;
        console.log('Disconnected from MongoDB.');
    }
};

module.exports = { connectDB, disconnectDB };
