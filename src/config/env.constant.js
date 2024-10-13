const MongoDbConfig = {
  connString: process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017',
  connOptions: {
    minPoolSize: 2, // Maintain minimun 2 socket connections
    maxPoolSize: 10, // Maintain up to 10 socket connections
    // replicaSet:.'",
    // connectTimeoutMS: 20000,
    // maxConnecting: 2,
    // maxIdleTimeMS:
    dbName: process.env.DB_NAME || 'inventoryDB',
    autoIndex: true,
    autoCreate: true,
    // directConnection:true,
    // LoadBalanced: true,
  }
}

const BasicConfig = {
  port:  process.env.PORT || 3000,
  apiBaseURI: (process.env.API_BASE_URI || 'http://localhost:3000') + '/v1',
  apiKey: process.env.API_KEY || 'fkdsjgn5295nfvdnewnegsfdgrwj',
}

// Validation to check if the connection string is valid:
if (!MongoDbConfig.connString) {
  throw new Error('MongoDB connection string is not defined');
}

module.exports = {
  MongoDbConfig,
  BasicConfig,
}