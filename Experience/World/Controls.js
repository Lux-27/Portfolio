import * as THREE from "three";
import GSAP from "gsap";
import Experience from "../Experience";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;

    // this.progress = 0;
    // this.dummyVector = new THREE.Vector3(0, 0, 0);

    // this.position = new THREE.Vector3(0, 0, 0);
    // this.lookAtPosition = new THREE.Vector3(0, 0, 0);

    // this.directionVector = new THREE.Vector3(0, 0, 0);
    // this.staticVector = new THREE.Vector3(0, 1, 0);
    // this.crossVector = new THREE.Vector3(0, 0, 0);

    // this.setPath();
    // this.onWheel();
  }

  // setPath() {
  //   // this.curve = new THREE.EllipseCurve(
  //   //   [
  //   //     0,
  //   //     0,
  //   //     10,
  //   //     10,
  //   //     0,
  //   //     2 * Math.PI,
  //   //     false,
  //   //     0,
  //   //   ],
  //   this.curve = new THREE.CatmullRomCurve3(
  //     [
  //       new THREE.Vector3(-5, 0, 0),
  //       new THREE.Vector3(0, 0, -5),
  //       new THREE.Vector3(5, 0, 0),
  //       new THREE.Vector3(0, 0, 5),
  //     ],
  //     true
  //   );

  //   const points = this.curve.getPoints(50);
  //   const geometry = new THREE.BufferGeometry().setFromPoints(points);

  //   const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

  //   const curveObject = new THREE.Line(geometry, material);
  //   this.scene.add(curveObject);
  // }

  // onWheel() {
  //   window.addEventListener("wheel", (e) => {
  //     console.log(e);
  //     if (e.deltaY > 0) {
  //       this.lerp.target += 0.01;
  //       this.back = false;
  //     } else {
  //       this.lerp.target -= 0.01;
  //       this.back = true;
  //     }
  //   });
  // }

  resize() {}

  update() {
    // this.curve.getPointAt(this.lerp.current % 1, this.position);
    // this.camera.orthographicCamera.position.copy(this.position);
    // this.directionVector.subVectors(
    //   this.curve.getPointAt((this.lerp.current % 1) + 0.00001),
    //   this.position
    // );
    // this.directionVector.normalize();
    // this.crossVector.crossVectors(this.directionVector, this.staticVector);
    // this.crossVector.multiplyScalar(10000);
    // this.camera.orthographicCamera.lookAt(this.crossVector);
    // if (this.back) {
    //   this.lerp.target -= 0.001;
    // } else {
    //   this.lerp.target += 0.001;
    // }
    // this.lerp.target = GSAP.utils.clamp(0, 1, this.lerp.target);
    // this.lerp.current = GSAP.utils.clamp(0, 1, this.lerp.current);
    // this.curve.getPointAt(this.lerp.current, this.position);
    // this.curve.getPointAt(this.lerp.current + 0.0001, this.lookAtPosition);
    // this.camera.orthographicCamera.position.copy(this.position);
    // this.camera.orthographicCamera.lookAt(this.lookAtPosition);
  }
}
