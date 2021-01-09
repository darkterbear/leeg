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
