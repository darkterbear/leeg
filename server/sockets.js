/**
 * User schema
 *
 * 'id': {
 *    x: Number,
 *    y: Number,
 *    d: Number,
 *    s: Number
 * }
 */

const users = {}

/**
 * A dictionary of pending setTimeout handlers for disconnecting users
 */
const disconnects = {}

const hat = length => {
	let text = ''
	const possible = 'abcdef0123456789'

	for (let i = 0; i < length; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length))

	return text
}

module.exports = server => {
	const io = require('socket.io')(server, {
    origins: '*:*',
    cors: {
      origins: 'http://localhost:5000'
    }
	})

	io.on('connection', socket => {
		// autoassign id
		var id = hat(8)
		while (Object.keys(users).includes(id)) {
			id = hat(8)
		}

		// send id to client
		socket.emit('id', id)
		socket.join(id)

		socket.on('update_movement', (x, y, d, s) => {
      users[id] = {
        x, y, d, s
      }
		})

		socket.on('disconnect', () => {
			const handler = setTimeout(() => {
				if (!users[id]) return
				delete users[id]
			}, 3000)

			disconnects[id] = handler
		})
  })

  // Update clients 30 ticks per second
  setInterval(() => {
    io.sockets.emit('update_movement', users);
  }, 1000 / 30)
}