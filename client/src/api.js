const socket = io('https://leeg-server.terranceli.com');
let mId = null

socket.on('id', (id) => {
  mId = id
})

socket.on('update_movement', (users) => {
  delete users[mId]

  const idSet = new Set(Object.keys(users))
  for (let id in players) {
    if (!idSet.has(id)) {
      scene.remove(players[id].chicken)
      delete players[id]
    }
  }

  for (let id in users) {
    if (!players[id]) {
      players[id] = {
        s: users[id].s,
        chicken: new Chicken()
      }

      scene.add(players[id].chicken);
    } else {
      players[id].chicken.position.x = users[id].x
      players[id].chicken.position.y = users[id].y
      players[id].chicken.rotation.z = users[id].d
      players[id].s = users[id].s
    }
  }
})

setInterval(() => {
  const x = chicken.position.x
  const y = chicken.position.y

  const distToTarget = Math.sqrt((target.x - chicken.position.x) ** 2 + (target.y - chicken.position.y) ** 2)
  const d = chicken.rotation.z
  let s = CHICKEN_SPEED
  if (distToTarget < 1) {
    s = 0
  }

  socket.emit('update_movement', x, y, d, s)
}, 30)
