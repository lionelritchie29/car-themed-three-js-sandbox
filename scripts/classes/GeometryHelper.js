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

  static createAndAddTorus = (scene, pos) => {
    const geometry = new THREE.TorusGeometry(25, 1.5, 8, 48);
    const material  = new THREE.MeshPhongMaterial({color: 0x34362B});
    const torus = new THREE.Mesh(geometry, material);
    torus.position.copy(pos);
    scene.add(torus);
    return torus;
  }

  static createAndAddTunnel = (scene, pos, name) => {
    const geometry = new THREE.CircleGeometry(25, 16);
    const texture = new THREE.TextureLoader().load('../../assets/textures/tunnel.jpg');
    texture.offset.y = -0.4;
    const material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
    const circle = new THREE.Mesh(geometry, material);
    circle.name  = name;

    circle.position.copy(pos);
    scene.add(circle);
    return circle;
  }

  static getRandomTunnelTexture(item) {
    const textures = ["tunnel.jpg", "tunnel2.jpg", "tunnel3.jpg"];

    let randomTexture = null;
    do {
      randomTexture = textures[Math.floor(Math.random()*textures.length)];
    }
    while (item.object.material.map.image.currentSrc.includes(randomTexture));

    const texture = new THREE.TextureLoader().load('../../assets/textures/' + randomTexture);
    texture.offset.y = -0.4;
    return texture;
  }
}

export default GeometryHelper;