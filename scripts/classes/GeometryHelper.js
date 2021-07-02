import * as THREE from '../threejs/build/three.module.js';

class GeometryHelper {
  static createAndAddFloor = (scene) => {
    const geometry = new THREE.PlaneGeometry(200, 200);
    const grassTexture = new THREE.TextureLoader().load("../../assets/textures/grass.jpg");
    grassTexture.repeat = new THREE.Vector2(1, 1);
    const material = new THREE.MeshBasicMaterial({map: grassTexture, side: THREE.DoubleSide});
    const floor = new THREE.Mesh(geometry, material);
    floor.position.set(0, -0.1, 0);
    floor.rotateX(Math.PI / 2);
    scene.add(floor);
  }

  static createAndAddSun = (scene) => {
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshBasicMaterial({color: 0xffbf00});
    const sun = new THREE.Mesh(geometry, material);
    scene.add(sun);
  }
}

export default GeometryHelper;