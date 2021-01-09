const socket = io('http://localhost:3000');
let mId = null

socket.on('id', (id) => {
  mId = id
})

socket.on('update_movement', (users) => {
  delete users[mId]

  console.log(users)
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
