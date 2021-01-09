const socket = io('http://localhost:3000');
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
        dx: users[id].dx,
        dy: users[id].dy,
        s: users[id].s,
        chicken: new Chicken()
      }

      scene.add(players[id].chicken);
    } else {
      players[id].chicken.position.x = users[id].x
      players[id].chicken.position.y = users[id].y
      players[id].dx = users[id].dx
      players[id].dy = users[id].dy
      players[id].s = users[id].s
    }
  }
})

setInterval(() => {
  const x = chicken.position.x
  const y = chicken.position.y

  const distToTarget = Math.sqrt((target.x - chicken.position.x) ** 2 + (target.y - chicken.position.y) ** 2)
  let dx, dy
  if (distToTarget > 1) {
    dx = (target.x - chicken.position.x) / distToTarget
    dy = (target.y - chicken.position.y) / distToTarget
  } else {
    dx = 0
    dy = 0
  }

  socket.emit('update_movement', x, y, dx, dy, CHICKEN_SPEED)
}, 30)
