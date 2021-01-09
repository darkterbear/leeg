const GRASS_WIDTH = 2000
const GRASS_HEIGHT = 600
const GRASS_THICKNESS = 20

function Grass() {
  const grass = new THREE.Group();

  const createSection = color => new THREE.Mesh(
    new THREE.BoxBufferGeometry(GRASS_WIDTH, GRASS_HEIGHT, GRASS_THICKNESS), 
    new THREE.MeshPhongMaterial({ color })
  );

  const main = createSection(0xbaf455);
  main.receiveShadow = true;
  grass.add(main);
  grass.position.z = 3;

  this.mesh = grass;
}
