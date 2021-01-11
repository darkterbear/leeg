const socket = io('http://localhost:3001');
// const socket = io('https://leeg-server.terranceli.com');
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
      const p = players[id]
      
      p.s = users[id].s

      const oldPosition = p.chicken.position
      if (p.chicken.rotation.z !== users[id].d || Math.sqrt((oldPosition.x - users[id].x) ** 2 + (oldPosition.y - users[id].y) ** 2) > p.s * 50) {
        p.chicken.position.x = users[id].x
        p.chicken.position.y = users[id].y
      }
      
      p.chicken.rotation.z = users[id].d
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
