'use strict'
const cors = require('cors')
const app = require('express')()
const port = 3000

app.use(cors({
  origin: ['http://localhost:5000', 'http://localhost:3000'],
  credentials: true
}));

const server = require('http').Server(app)

// attach socket.io api
require('./sockets')(server)

server.listen(port, () => {
	console.log('Leeg Server is live on port ' + port + '\n')
})
