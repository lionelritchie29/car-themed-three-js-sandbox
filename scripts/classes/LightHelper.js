import * as THREE from '../threejs/build/three.module.js';

class LightHelper {
  static addAmbientLight = (scene) => {
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    return ambientLight;
  }

  static addPointLight = (scene) => {
    const pointLight = new THREE.PointLight(0xffffff, 2.5);
    pointLight.castShadow = true;
    scene.add(pointLight);
    return pointLight;
  }
}

export default LightHelper;