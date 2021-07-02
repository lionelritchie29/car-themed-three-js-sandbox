import * as THREE from './threejs/build/three.module.js';
import GLOBALS from './globals/global.js';

const load = () => {
  console.log("Loaded succesfully");
  
  const {scene, orbitCamera, renderer} = init();

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, orbitCamera);
  }

  animate();
}

const init = () => {
  const {ASPECT_RATIO, NEAR, FAR, ORBIT_FOV} = GLOBALS;
  const orbitCamera = new THREE.PerspectiveCamera(ORBIT_FOV, ASPECT_RATIO, NEAR, FAR); 
  const scene = new THREE.Scene();
  const renderer = initRenderer();

  return {scene, orbitCamera, renderer};
}

const initRenderer = () => {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  return renderer;
}

load();