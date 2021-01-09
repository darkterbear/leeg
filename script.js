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

const zoom = 2;

// Configure protagonist
const chickenSize = 15;

const chicken = new Chicken();
scene.add(chicken);

// Configure lighting
hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
scene.add(hemiLight)

const initialDirLightPositionX = 100;
const initialDirLightPositionY = 100;
dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
dirLight.position.set(initialDirLightPositionX, initialDirLightPositionY, 200);
dirLight.castShadow = true;
dirLight.target = chicken;
scene.add(dirLight);

dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
var d = 500;
dirLight.shadow.camera.left = - d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = - d;

backLight = new THREE.DirectionalLight(0x000000, .4);
backLight.position.set(200, 200, 50);
backLight.castShadow = true;
scene.add(backLight)

const initaliseValues = () => {
  // Generate grass
  const grass = new Grass();
  scene.add(grass.mesh);

  chicken.position.x = 0;
  chicken.position.y = 0;

  dirLight.position.x = initialDirLightPositionX;
  dirLight.position.y = initialDirLightPositionY;
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
    new THREE.BoxBufferGeometry(1000*zoom, 300*zoom, 3*zoom ), 
    new THREE.MeshPhongMaterial( { color } )
  );

  const main = createSection(0xbaf455);
  main.receiveShadow = true;
  grass.add(main);
  grass.position.z = 1.5*zoom;

  this.mesh = grass;
}

function Chicken() {
  const chicken = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.BoxBufferGeometry( chickenSize*zoom, chickenSize*zoom, 20*zoom ), 
    new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } )
  );
  body.position.z = 10*zoom;
  body.castShadow = true;
  body.receiveShadow = true;
  chicken.add(body);

  const rowel = new THREE.Mesh(
    new THREE.BoxBufferGeometry( 2*zoom, 4*zoom, 2*zoom ), 
    new THREE.MeshLambertMaterial( { color: 0xF0619A, flatShading: true } )
  );
  rowel.position.z = 21*zoom;
  rowel.position.y += 10
  rowel.castShadow = true;
  rowel.receiveShadow = false;
  chicken.add(rowel);

  return chicken;  
}

function animate(timestamp) {
  requestAnimationFrame( animate );

  // console.log('hi')
  renderer.render( scene, camera );	
}

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  x = e.clientX - window.innerWidth / 2
  y = -e.clientY / Math.sqrt(3) * 2 + window.innerHeight / 2 + 110

  chicken.rotation.z = Math.atan2(y - chicken.position.y, x - chicken.position.x) - Math.PI / 2
})

requestAnimationFrame( animate );