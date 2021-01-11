// Initialize three.js scene
const scene = new THREE.Scene();

// Configure protagonist
const CHICKEN_INITIAL_POSITION = {
  x: 0,
  y: 0,
  z: 0
}

const CHICKEN_SIZE = 30;
const CHICKEN_SPEED = 5;
const chicken = new Chicken();

scene.add(chicken);
chicken.position = CHICKEN_INITIAL_POSITION

const target = {
  x: 0,
  y: 0
}

// Initialize other player state
/**
 * Schema: {
 *    id: {
 *      chicken, x, y, dx, dy, s
 *    }
 * }
 */
const players = {}

// Configure camera
const DISTANCE = 500;
const CAMERA_OFFSET = {
  x: 0,
  y: -DISTANCE / 2,
  z: DISTANCE
}

const camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 10000);

camera.rotation.x = 30 * Math.PI / 180;
camera.rotation.y = 0 * Math.PI / 180;
camera.rotation.z = 0 * Math.PI / 180;

camera.position.x = CHICKEN_INITIAL_POSITION.x + CAMERA_OFFSET.x;
camera.position.y = CHICKEN_INITIAL_POSITION.y + CAMERA_OFFSET.y;
camera.position.z = CHICKEN_INITIAL_POSITION.z + CAMERA_OFFSET.z;

// Configure lighting
hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
scene.add(hemiLight)

dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
dirLight.castShadow = true;
scene.add(dirLight);

dirLight.shadow.mapSize.width = 4096;
dirLight.shadow.mapSize.height = 4096;

const d = 1000;
dirLight.shadow.camera.left = -d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = -d;
dirLight.shadow.camera.far = 2000

dirLight.position.x = 300
dirLight.position.y = 400
dirLight.position.z = 1000

// Generate grass
const grass = new Grass();
scene.add(grass.mesh);

// Configure renderer
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

function moveEntity(e, dx, dy) {
  e.position.x += dx
  e.position.y += dy
}

function move(dx, dy) {
  chicken.position.x += dx
  chicken.position.y += dy

  camera.position.x = chicken.position.x
  camera.position.y = chicken.position.y - DISTANCE / 2
}

function animate(timestamp) {
  requestAnimationFrame(animate);

  // Update chicken position
  const distToTarget = Math.sqrt((target.x - chicken.position.x) ** 2 + (target.y - chicken.position.y) ** 2)
  if (distToTarget > 1) {
    let dx = (target.x - chicken.position.x) / distToTarget * CHICKEN_SPEED
    let dy = (target.y - chicken.position.y) / distToTarget * CHICKEN_SPEED

    if (distToTarget < CHICKEN_SPEED) {
      dx = (target.x - chicken.position.x)
      dy = (target.y - chicken.position.y)
    }

    move(dx, dy)
  }

  // Update other player positions
  for (let id in players) {
    const p = players[id]
    const d = p.chicken.rotation.z
    const s = p.s

    const dx = -Math.sin(d) * s
    const dy = Math.cos(d) * s

    moveEntity(p.chicken, dx, dy)
  }

  renderer.render(scene, camera);	
}

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  x = e.clientX - window.innerWidth / 2 + chicken.position.x
  y = -e.clientY / Math.sqrt(3) * 2 + window.innerHeight / 2 + 110 + chicken.position.y

  if (Math.abs(x) * 2 >= GRASS_WIDTH || Math.abs(y) * 2 >= GRASS_HEIGHT) {
    return;
  }

  chicken.rotation.z = Math.atan2(y - chicken.position.y, x - chicken.position.x) - Math.PI / 2
  target.x = x
  target.y = y
})

requestAnimationFrame(animate);
