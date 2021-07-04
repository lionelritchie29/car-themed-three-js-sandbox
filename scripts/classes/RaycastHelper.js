import * as THREE from "../threejs/build/three.module.js";

class RaycastHelper {
  static init = () => {
    const raycaster = new THREE.Raycaster();
    const mouseRaycast = new THREE.Vector2();

    return {raycaster, mouseRaycast};
  }
}

export default RaycastHelper;