var MongoClient = require('mongodb').MongoClient;
var Server      = require('mongodb').Server;

var host   = process.env.MONGO_HOST;
var port   = parseInt(process.env.MONGO_PORT, 10);
var dbName = 'app';

var serverOptions = {
  auto_reconnect: true, 
  poolSize: 20
};

var dbOptions = {
  retryMiliSeconds: 5000, 
  numberOfRetries: 4,
  w: 1
};

var server = new Server(host, port, serverOptions);
var client = new MongoClient(server, dbOptions);

exports.client = client;

// Make sure we can connect to database.
// Throw any error to halt program.
exports.init = function(cb) {
  client.open(function(err, db) {
    if (err) throw err;
    db.close(); 
    cb();
  }); 
};
