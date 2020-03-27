const express = require('express');

const accountsRouter = require('./accounts/accountsRouter');

const server = express();

server.get('/', (req, res) => {
    res.send('<h1>Bring out your dead.</h1>');
})

server.use(express.json());
server.use('/api/accounts', accountsRouter)

module.exports = server;