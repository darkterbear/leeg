const socket = io('https://leeg-server.terranceli.com');
// const socket = io('http://localhost:3001');
let mId = null

socket.on('id', (id) => {
  mId = id
  updateMovement(0, 0, {x: 0, y: 0}, CHICKEN_SPEED)
})

socket.on('user_left', (id) => {
  if (players[id]) {
    scene.remove(players[id].chicken)
    delete players[id]
  }
})

socket.on('update_movement', (users) => {
  delete users[mId]

  for (let id in users) {
    if (!players[id]) {
      players[id] = {
        chicken: new Chicken()
      }
      scene.add(players[id].chicken);
    }

    players[id].s = users[id].s
    players[id].t = users[id].target
    players[id].chicken.position.x = users[id].x
    players[id].chicken.position.y = users[id].y
  }
})

function updateMovement(x, y, target, s) {
  socket.emit('update_movement', x, y, target, s)
}
