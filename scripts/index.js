import * as THREE from './threejs/build/three.module.js';
import { OrbitControls } from './threejs/examples/jsm/controls/OrbitControls.js';
import GLOBALS from './globals/global.js';
import CAR_PROPERTIES from './globals/car_properties.js';
import ModelHelper from './classes/ModelHelper.js';
import LightHelper from './classes/LightHelper.js';
import SkyboxHelper from './classes/SkyboxHelper.js';
import GeometryHelper from './classes/GeometryHelper.js';
import RaycastHelper from './classes/RaycastHelper.js';

const { FIRST_TUNNEL_NAME, SECOND_TUNNEL_NAME } = GLOBALS;
let {isMovingForward, isFirstPerson, isMovingBackward, isRotateLeft, isRotateRight, velocity, ROTATE_RAD} = CAR_PROPERTIES;
let isClicked = false;

const load = async () => {
  const {scene, thirdPersonCamera, fpsControl, tpsControl, firstPersonCamera, renderer} = init();
  const {car} = await setModel(scene);
  const {pointLight} = setLight(scene);
  
  setCamera(car, fpsControl, tpsControl, thirdPersonCamera, firstPersonCamera);
  SkyboxHelper.loadAndSetSkybox(scene, pointLight);
  setGeometry(scene, pointLight);
  handleKeyboardEvent();

  const {mouseRaycast, raycaster} = RaycastHelper.init();
  document.addEventListener('pointerdown', (e) => {
    mouseRaycast.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	  mouseRaycast.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    isClicked = true;
  })

  const animate = () => {
    requestAnimationFrame(animate);

    if (isClicked) {
      raycaster.setFromCamera(mouseRaycast, thirdPersonCamera);

      const intersects = raycaster.intersectObjects(scene.children);

      intersects.forEach(item =>  {
        if (item.object.name === FIRST_TUNNEL_NAME || item.object.name === SECOND_TUNNEL_NAME) {
          item.object.material.map = GeometryHelper.getRandomTunnelTexture(item);
          item.object.material.needsUpdate = true;
        }
      });
      isClicked = false;
    }

    if (isFirstPerson) {
      renderer.render(scene, firstPersonCamera);
    } else {
      renderer.render(scene, thirdPersonCamera);
    }

    if (isMovingForward) {
      car.translateX(velocity);
    } else if (isMovingBackward) {
      car.translateX(velocity * -1);
    }

    if (isRotateLeft) {
      car.rotateY(ROTATE_RAD)
    } else if (isRotateRight) {
      car.rotateY(ROTATE_RAD * -1)
    }
  }

  animate();
}

const init = () => {
  const renderer = initRenderer();
  const scene = new THREE.Scene();
  const {tpsControl, fpsControl, thirdPersonCamera, firstPersonCamera} = initCamera(renderer);

  return {scene, fpsControl, thirdPersonCamera, tpsControl, firstPersonCamera, renderer};
}

const initCamera = (renderer) => {
  const {ASPECT_RATIO, NEAR, FAR, ORBIT_FOV} = GLOBALS;
  const thirdPersonCamera = new THREE.PerspectiveCamera(ORBIT_FOV, ASPECT_RATIO, NEAR, FAR); 
  const firstPersonCamera = new THREE.PerspectiveCamera(ORBIT_FOV, ASPECT_RATIO, NEAR, FAR);
  const tpsControl = new OrbitControls(thirdPersonCamera, renderer.domElement);
  const fpsControl = new OrbitControls(firstPersonCamera, renderer.domElement);
  return {thirdPersonCamera, firstPersonCamera, tpsControl, fpsControl};
}

const initRenderer = () => {
  const renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.shadowMap.enabled = true;
  // renderer.shadowMap = THREE.PCFShadowMap;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  return renderer;
}

const setCamera = (car, fpsControl, tpsControl, thirdPersonCamera, firstPersonCamera) => {
  car.add(thirdPersonCamera);
  thirdPersonCamera.position.y = 300;
  thirdPersonCamera.position.x = -750;
  tpsControl.update();

  car.add(firstPersonCamera);
  firstPersonCamera.position.y = 300;
  firstPersonCamera.position.x = 750;
  fpsControl.update();
}

const setModel = async (scene) => {
  const car = await ModelHelper.LoadCar();
  const crossingRoad1 = await ModelHelper.LoadCrossingRoad(new THREE.Vector3(10, 0, 0));
  const crossingRoad2 = await ModelHelper.LoadCrossingRoad(new THREE.Vector3(10, 0, -110));
  const crossingRoad3 = await ModelHelper.LoadCrossingRoad(new THREE.Vector3(10, 0, 110));

  scene.add(car);
  scene.add(crossingRoad1);
  scene.add(crossingRoad2);
  scene.add(crossingRoad3);

  return {car, crossingRoad1, crossingRoad2, crossingRoad3};
}

const setLight = (scene) => {
  const ambientLight = LightHelper.addAmbientLight(scene);
  const pointLight = LightHelper.addPointLight(scene);
  return {ambientLight, pointLight};
}

const setGeometry = (scene, pointLight) => {
  GeometryHelper.createAndAddFloor(scene);
  GeometryHelper.createAndAddSun(scene, pointLight);

  GeometryHelper.createAndAddBuilding(scene, new THREE.Vector3(-30, 10, 0), new THREE.Vector3(10, 25, 20));
  GeometryHelper.createAndAddBuilding(scene, new THREE.Vector3(-30, 15, 25), new THREE.Vector3(10, 30, 20));
  GeometryHelper.createAndAddBuilding(scene, new THREE.Vector3(-30, 15, -25), new THREE.Vector3(10, 30, 20));
  GeometryHelper.createAndAddBuilding(scene, new THREE.Vector3(-30, 10, 50), new THREE.Vector3(10, 25, 20));
  GeometryHelper.createAndAddBuilding(scene, new THREE.Vector3(-30, 10, -50), new THREE.Vector3(10, 35, 20));
  GeometryHelper.createAndAddBuilding(scene, new THREE.Vector3(-30, 15, 75), new THREE.Vector3(10, 35, 20));
  GeometryHelper.createAndAddBuilding(scene, new THREE.Vector3(-30, 15, -75), new THREE.Vector3(10, 35, 20));

  GeometryHelper.createAndAddBuilding(scene, new THREE.Vector3(50, 10, 0), new THREE.Vector3(10, 25, 20));
  GeometryHelper.createAndAddBuilding(scene, new THREE.Vector3(50, 15, 25), new THREE.Vector3(10, 30, 20));
  GeometryHelper.createAndAddBuilding(scene, new THREE.Vector3(50, 15, -25), new THREE.Vector3(10, 30, 20));
  GeometryHelper.createAndAddBuilding(scene, new THREE.Vector3(50, 10, 50), new THREE.Vector3(10, 25, 20));
  GeometryHelper.createAndAddBuilding(scene, new THREE.Vector3(50, 10, -50), new THREE.Vector3(10, 35, 20));
  GeometryHelper.createAndAddBuilding(scene, new THREE.Vector3(50, 15, 75), new THREE.Vector3(10, 35, 20));
  GeometryHelper.createAndAddBuilding(scene, new THREE.Vector3(50, 15, -75), new THREE.Vector3(10, 35, 20));

  GeometryHelper.createAndAddTorus(scene, new THREE.Vector3(10, 0, -97.5));
  GeometryHelper.createAndAddTunnel(scene, new THREE.Vector3(10, 0, -97.5), FIRST_TUNNEL_NAME);

  GeometryHelper.createAndAddTorus(scene, new THREE.Vector3(10, 0, 97.5));
  GeometryHelper.createAndAddTunnel(scene, new THREE.Vector3(10, 0, 97.5), SECOND_TUNNEL_NAME);
}

const handleKeyboardEvent = () => {
  window.addEventListener('keydown', (e) => {
    if (e.code == "KeyC") {
      isFirstPerson = !isFirstPerson;
    } else if (e.code == "KeyW") {
      isMovingForward = true;
    } else if (e.code == "KeyS") {
      isMovingBackward = true;
    } else if (e.code == "KeyA") {
      isRotateLeft = true;
    } else if (e.code == "KeyD") {
      isRotateRight = true;
    }
  })

  window.addEventListener('keyup', (e) => {
    if (e.code == "KeyW") {
      isMovingForward = false;
    } else if (e.code == "KeyS") {
      isMovingBackward = false;
    } else if (e.code == "KeyA") {
      isRotateLeft = false;
    } else if (e.code == "KeyD") {
      isRotateRight = false;
    }
  })
}

await load();