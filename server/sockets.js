/**
 * User schema
 *
 * 'id': {
 *    x: Number,
 *    y: Number
 *    dx: Number,
 *    dy: Number,
 *    s: Number
 * }
 */

var users = {}

/**
 * A dictionary of pending setTimeout handlers for disconnecting users
 */
var disconnects = {}

const hat = length => {
	var text = ''
	var possible = 'abcdef0123456789'

	for (var i = 0; i < length; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length))

	return text
}

module.exports = server => {
	const io = require('socket.io')(server, {
		origins: '*:*'
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

		socket.on('update_movement', (x, y, dx, dy, s) => {
      users[id] = {
        x, y, dx, dy, s
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
    io.emit(users)
  }, 1000 / 30)
}