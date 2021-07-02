import { GLTFLoader } from '../threejs/examples/jsm/loaders/GLTFLoader.js';

class ModelHelper {
  static LoadCar = async () => {
    const carModelPath = '../../assets/models/low_poly_truck/scene.gltf';
    const loader = new GLTFLoader();

    return new Promise((resolve, reject) => {
      loader.load(carModelPath, (gltf) => {
        const car = gltf.scene; 
        car.scale.set(0.005, 0.005, 0.005);
        car.rotateY(Math.PI / 2);
        car.position.set(0, 0.4, 0)
        resolve(gltf.scene);
      }, () => {console.log('car model succesfully loaded')}, (err) => {reject(err)});
    })
  }

  static LoadCrossingRoad = async () => {
    const roadModelPath = '../../assets/models/road_crossing/scene.gltf';
    const loader = new GLTFLoader();

    return new Promise((resolve, reject) => {
      loader.load(roadModelPath, (gltf) => {
        // gltf.scene.scale.set(0.01, 0.01, 0.01);
        resolve(gltf.scene);
      }, () => {console.log('road model succesfully loaded')}, (err) => {reject(err)});
    })
  }
}

export default ModelHelper;