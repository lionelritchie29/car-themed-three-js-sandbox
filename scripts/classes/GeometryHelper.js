import * as THREE from '../threejs/build/three.module.js';

class GeometryHelper {
  static createAndAddFloor = (scene) => {
    const geometry = new THREE.PlaneGeometry(200, 200);
    const grassTexture = new THREE.TextureLoader().load("../../assets/textures/grass.jpg");
    grassTexture.repeat = new THREE.Vector2(1, 1);
    const material = new THREE.MeshLambertMaterial({map: grassTexture, side: THREE.DoubleSide});
    
    const floor = new THREE.Mesh(geometry, material);
    floor.castShadow = true;
    floor.receiveShadow = true;
    floor.position.set(0, -1, 0);
    floor.rotateX(Math.PI / 2);
    
    scene.add(floor);
  }

  static createAndAddSun = (scene, pointLight) => {
    const geometry = new THREE.SphereGeometry(12, 32, 32);
    const material = new THREE.MeshBasicMaterial({color: 0xffbf00});
    const sun = new THREE.Mesh(geometry, material);
    sun.position.set(50, 125, 75);
    pointLight.position.copy(sun.position);
    scene.add(sun);
    return sun;
  }

  static createAndAddBuilding = (scene, pos, scl) => {
    const imgs = ["building1.jpg", "building2.jpg", "building3.jpg"];
    const geometry = new THREE.BoxGeometry();
    const texture = new THREE.TextureLoader().load(`../../assets/textures/${imgs[Math.floor(Math.random() * imgs.length)]}`);
    const material = new THREE.MeshLambertMaterial({map: texture});
    const building = new THREE.Mesh(geometry, material);
    
    building.castShadow = true;
    building.receiveShadow = true;

    building.position.copy(pos);
    building.scale.copy(scl)
    
    scene.add(building);
    return building;
  }
}

export default GeometryHelper;