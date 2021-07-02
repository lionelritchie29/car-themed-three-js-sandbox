import * as THREE from './threejs/build/three.module.js';
import { OrbitControls } from './threejs/examples/jsm/controls/OrbitControls.js';
import GLOBALS from './globals/global.js';
import ModelHelper from './classes/ModelHelper.js';
import LightHelper from './classes/LightHelper.js';
import SkyboxHelper from './classes/SkyboxHelper.js';
import GeometryHelper from './classes/GeometryHelper.js';

const load = async () => {
  console.log("Loaded succesfully");
  
  const {scene, orbitCamera, renderer} = init();
  await setModel(scene);
  setLight(scene);
  SkyboxHelper.loadAndSetSkybox(scene);
  GeometryHelper.createAndAddFloor(scene);
  GeometryHelper.createAndAddSun(scene);
  
  
  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, orbitCamera);
  }

  animate();
}

const init = () => {
  const renderer = initRenderer();
  const scene = new THREE.Scene();
  const orbitCamera = initCamera(renderer);

  return {scene, orbitCamera, renderer};
}

const initCamera = (renderer) => {
  const {ASPECT_RATIO, NEAR, FAR, ORBIT_FOV} = GLOBALS;
  const orbitCamera = new THREE.PerspectiveCamera(ORBIT_FOV, ASPECT_RATIO, NEAR, FAR); 
  const control = new OrbitControls(orbitCamera, renderer.domElement);
  orbitCamera.position.z = 10;
  orbitCamera.position.y = 15;
  control.update();
  return orbitCamera;
}

const initRenderer = () => {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  return renderer;
}

const setModel = async (scene) => {
  const car = await ModelHelper.LoadCar();
  const crossingRoad1 = await ModelHelper.LoadCrossingRoad(new THREE.Vector3(0, 0, 0));
  const crossingRoad2 = await ModelHelper.LoadCrossingRoad(new THREE.Vector3(0, 0, -110));
  const crossingRoad3 = await ModelHelper.LoadCrossingRoad(new THREE.Vector3(0, 0, 110));

  
  scene.add(car);
  scene.add(crossingRoad1);
  scene.add(crossingRoad2);
  scene.add(crossingRoad3);
}

const setLight = (scene) => {
  LightHelper.addAmbientLight(scene);
  LightHelper.addPointLight(scene);
}

await load();