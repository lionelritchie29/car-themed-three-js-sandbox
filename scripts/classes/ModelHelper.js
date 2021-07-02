import { GLTFLoader } from '../threejs/examples/jsm/loaders/GLTFLoader.js';

class ModelHelper {
  static LoadCar = async () => {
    const carModelPath = '../../assets/models/low_poly_truck/scene.gltf';
    const loader = new GLTFLoader();

    return new Promise((resolve, reject) => {
      loader.load(carModelPath, (gltf) => {
        const car = gltf.scene; 

        car.traverse(node => {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        })

        car.scale.set(0.02, 0.02, 0.02);
        car.rotateY(Math.PI / 2);
        car.position.set(0, 0.75, 0)
        resolve(gltf.scene);
      }, () => {console.log('car model succesfully loaded')}, (err) => {reject(err)});
    })
  }

  static LoadCrossingRoad = async (pos) => {
    const roadModelPath = '../../assets/models/road_crossing/scene.gltf';
    const loader = new GLTFLoader();

    return new Promise((resolve, reject) => {
      loader.load(roadModelPath, (gltf) => {
        const road = gltf.scene; 
        road.scale.set(0.2, 0.2, 0.2);
        road.position.copy(pos);

        resolve(gltf.scene);
      }, () => {console.log('road model succesfully loaded')}, (err) => {reject(err)});
    })
  }
}

export default ModelHelper;