import * as THREE from '../threejs/build/three.module.js';

class LightHelper {
  static addAmbientLight = (scene) => {
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
  }

  static addPointLight = (scene) => {
    const pointLight = new THREE.PointLight(0xffffff, 1);
    scene.add(pointLight);
  }
}

export default LightHelper;