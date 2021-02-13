const jsonServer = require('json-server');

const server = jsonServer.create();

server.use(jsonServer.rewriter(require('./routes.json')));

server.use(jsonServer.defaults({
  noCors: false,
  static: './json-server/public/'
}));

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

const middlewares = require('./middlewares.js');
server.use(middlewares);

const router = jsonServer.router(require('./data/db.js')());
server.use(router);

const pause = require('connect-pause');
server.use(pause(3000));

const server_port = 3000;

server.listen(server_port, () => {
  console.log('');
  console.log('** ');
  console.log(' Json Server is Up & Running at port ' + server_port + ' ');
  console.log(' **');
  console.log('');
});
