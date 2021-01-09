'use strict'
const cors = require('cors')
const app = require('express')()
const port = 3001

app.use(cors({
  origin: ['http://localhost:5000', 'https://leeg.terranceli.com'],
  credentials: true
}));

const server = require('http').Server(app)

// attach socket.io api
require('./sockets')(server)

server.listen(port, () => {
	console.log('Leeg Server is live on port ' + port + '\n')
})
