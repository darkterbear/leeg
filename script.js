// Initialize three.js scene
const scene = new THREE.Scene();

// Configure camera
const distance = 500;

const camera = new THREE.OrthographicCamera( window.innerWidth/-2, window.innerWidth/2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 10000 );

camera.rotation.x = 30*Math.PI/180;
camera.rotation.y = 0*Math.PI/180;
camera.rotation.z = 0*Math.PI/180;

camera.position.y = -distance / 2;
camera.position.x = 0;
camera.position.z = distance;

// Configure protagonist
const chickenSize = 30;
const speed = 10;
const chicken = new Chicken();
scene.add(chicken);

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
// dirLight.target = chicken;
scene.add(dirLight);

dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
var d = 500;
dirLight.shadow.camera.left = - d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = - d;

const initaliseValues = () => {
  // Generate grass
  const grass = new Grass();
  scene.add(grass.mesh);

  chicken.position.x = 0;
  chicken.position.y = 0;

  dirLight.position.x = 100;
  dirLight.position.y = 200;
}

initaliseValues();

// Configure renderer
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

function Grass() {
  const grass = new THREE.Group();

  const createSection = color => new THREE.Mesh(
    new THREE.BoxBufferGeometry(2000, 600, 6), 
    new THREE.MeshPhongMaterial({ color })
  );

  const main = createSection(0xbaf455);
  main.receiveShadow = true;
  grass.add(main);
  grass.position.z = 3;

  this.mesh = grass;
}

function Chicken() {
  const chicken = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.BoxBufferGeometry( chickenSize, chickenSize, 40), 
    new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } )
  );

  body.position.z = 20;
  body.castShadow = true;
  body.receiveShadow = true;
  chicken.add(body);

  const rowel = new THREE.Mesh(
    new THREE.BoxBufferGeometry(4, 8, 4), 
    new THREE.MeshLambertMaterial( { color: 0xF0619A, flatShading: true } )
  );

  rowel.position.z = 42;
  rowel.position.y += 10
  rowel.castShadow = true;
  rowel.receiveShadow = false;
  chicken.add(rowel);

  return chicken;  
}

function animate(timestamp) {
  requestAnimationFrame( animate );

  // console.log(target, )
  const distToTarget = Math.sqrt((target.x - chicken.position.x) ** 2 + (target.y - chicken.position.y) ** 2)
  
  if (distToTarget > 1) {
    dx = (target.x - chicken.position.x) / distToTarget * speed
    dy = (target.y - chicken.position.y) / distToTarget * speed

    if (distToTarget < speed) {
      dx = (target.x - chicken.position.x)
      dy = (target.y - chicken.position.y)
    }

    chicken.position.x += dx
    chicken.position.y += dy

    camera.position.x = chicken.position.x
    camera.position.y = chicken.position.y - distance / 2
  }
  renderer.render( scene, camera );	
}

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  x = e.clientX - window.innerWidth / 2 + chicken.position.x
  y = -e.clientY / Math.sqrt(3) * 2 + window.innerHeight / 2 + 110 + chicken.position.y

  chicken.rotation.z = Math.atan2(y - chicken.position.y, x - chicken.position.x) - Math.PI / 2
  target.x = x
  target.y = y
})

requestAnimationFrame( animate );