function Chicken() {
  const chicken = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.BoxBufferGeometry(CHICKEN_SIZE, CHICKEN_SIZE, 40), 
    new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true })
  );

  body.position.z = 20;
  body.castShadow = true;
  body.receiveShadow = true;
  chicken.add(body);

  const rowel = new THREE.Mesh(
    new THREE.BoxBufferGeometry(4, 8, 4), 
    new THREE.MeshLambertMaterial({ color: 0xF0619A, flatShading: true })
  );

  rowel.position.z = 42;
  rowel.position.y += 10
  rowel.castShadow = true;
  rowel.receiveShadow = false;
  chicken.add(rowel);

  return chicken;  
}
