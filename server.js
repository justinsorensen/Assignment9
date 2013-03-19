// To create a web server for static content:
//   (1) Put is code in "server.js"
//   (2) Run npm install connect
//   (3) Run node server.js [<dir-to-serve-from>]
var connect = require('connect')
  , dir = process.argv.length > 2 ? process.argv[2] : __dirname;
connect.createServer(connect.static(dir)).listen(5000);
console.log('listen to port 5000');