import * as THREE from '../threejs/build/three.module.js';

class SkyboxHelper {
  static loadAndSetSkybox = (scene) => {
    const materials = [];
    const front = new THREE.TextureLoader().load('../../assets/skybox/front.jpg');
    const back = new THREE.TextureLoader().load('../../assets/skybox/back.jpg');
    const top = new THREE.TextureLoader().load('../../assets/skybox/top.jpg');
    const bottom = new THREE.TextureLoader().load('../../assets/skybox/bottom.jpg');
    const right = new THREE.TextureLoader().load('../../assets/skybox/right.jpg');
    const left = new THREE.TextureLoader().load('../../assets/skybox/left.jpg');

    materials.push(new THREE.MeshBasicMaterial({map: front}));
    materials.push(new THREE.MeshBasicMaterial({map: back}));
    materials.push(new THREE.MeshBasicMaterial({map: top}));
    materials.push(new THREE.MeshBasicMaterial({map: bottom}));
    materials.push(new THREE.MeshBasicMaterial({map: right}));
    materials.push(new THREE.MeshBasicMaterial({map: left}));

    materials.forEach(mat => mat.side = THREE.BackSide);
    const geometry = new THREE.BoxGeometry(200, 200, 200);
    const skybox = new THREE.Mesh(geometry, materials);
    skybox.position.set(0, 5, 0);
    scene.add(skybox);
  }
}

export default SkyboxHelper;