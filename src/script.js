// Initialize three.js scene
const scene = new THREE.Scene();

// Configure camera
const DISTANCE = 500;

const camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 10000);

camera.rotation.x = 30 * Math.PI / 180;
camera.rotation.y = 0 * Math.PI / 180;
camera.rotation.z = 0 * Math.PI / 180;

camera.position.y = -DISTANCE / 2;
camera.position.x = 0;
camera.position.z = DISTANCE;

// Configure protagonist
const CHICKEN_SIZE = 30;
const CHICKEN_SPEED = 10;
const chicken = new Chicken();

scene.add(chicken);
chicken.position.x = 0;
chicken.position.y = 0;

const target = {
  x: 0,
  y: 0
}

// Configure lighting
hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
scene.add(hemiLight)

dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
dirLight.position.set(0, 0, 200);
dirLight.castShadow = true;
scene.add(dirLight);

dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;

const d = 500;
dirLight.shadow.camera.left = -d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = -d;

dirLight.position.x = 100;
dirLight.position.y = 200;

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

function animate(timestamp) {
  requestAnimationFrame(animate);

  const distToTarget = Math.sqrt((target.x - chicken.position.x) ** 2 + (target.y - chicken.position.y) ** 2)
  
  if (distToTarget > 1) {
    dx = (target.x - chicken.position.x) / distToTarget * CHICKEN_SPEED
    dy = (target.y - chicken.position.y) / distToTarget * CHICKEN_SPEED

    if (distToTarget < CHICKEN_SPEED) {
      dx = (target.x - chicken.position.x)
      dy = (target.y - chicken.position.y)
    }

    chicken.position.x += dx
    chicken.position.y += dy

    camera.position.x = chicken.position.x
    camera.position.y = chicken.position.y - DISTANCE / 2
  }
  renderer.render(scene, camera);	
}

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  x = e.clientX - window.innerWidth / 2 + chicken.position.x
  y = -e.clientY / Math.sqrt(3) * 2 + window.innerHeight / 2 + 110 + chicken.position.y

  chicken.rotation.z = Math.atan2(y - chicken.position.y, x - chicken.position.x) - Math.PI / 2
  target.x = x
  target.y = y
})

requestAnimationFrame(animate);
