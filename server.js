const express = require('express');

const accountsRouter = require('./accounts/accountsRouter');

const server = express();

server.use(express.json());
server.use('/api/accounts', accountsRouter)

server.get('/', (req, res) => {
  res.status(200).json({ message: "API is online" })
})

function errorHandler(error, req, res) {
  const code = error.status || error.statusCode || 500;

  res.status(code).json(error);
}

server.use(errorHandler);

module.exports = server;