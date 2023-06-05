import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.setModel();
    this.setAnimation();
    this.onMouseMove();
  }

  setModel() {
    this.actualRoom.children.forEach((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }

      if (child instanceof THREE.Group) {
        child.children.forEach((groupChild) => {
          if (groupChild.isMesh) {
            groupChild.castShadow = true;
            groupChild.receiveShadow = true;
          }
        });
      }

      if (child.name === "Aquarium") {
        child.children[0].material = new THREE.MeshPhysicalMaterial();
        child.children[0].material.roughness = 1.5;
        child.children[0].material.color.set(0x549dd2);
        child.children[0].material.ior = 1;
        child.children[0].material.transmission = 1;
        child.children[0].material.opacity = 1;
      }

      if (child.name === "Computer") {
        child.children[1].material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        });
      }

      if (child.name === "Mini_Floor") {
        child.position.x = 0;
        child.position.z = 8;
      }

      if (
        child.name === "Mailbox" ||
        child.name === "Lamp" ||
        child.name === "FloorFirst" ||
        child.name === "FloorSecond" ||
        child.name === "FloorThird" ||
        child.name === "Dirt" ||
        child.name === "Flower1" ||
        child.name === "Flower2"
      ) {
        child.scale.set(0, 0, 0);
      }
    });

    const width = 1.2;
    const height = 1.2;
    const intensity = 1;
    const rectLight = new THREE.RectAreaLight(
      0xffffff,
      intensity,
      width,
      height
    );
    rectLight.position.set(9, 7, -1.75);
    rectLight.rotation.x = -Math.PI / 2;
    rectLight.rotation.z = Math.PI / 4;
    this.actualRoom.add(rectLight);

    // const rectLightHelper = new RectAreaLightHelper(rectLight);
    // rectLight.add(rectLightHelper);

    this.scene.add(this.actualRoom);
    this.actualRoom.scale.set(0.15, 0.15, 0.15);
    // this.actualRoom.rotation.y = -Math.PI / 4;
  }

  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.actualRoom);
    this.swim = this.mixer.clipAction(this.room.animations[0]);
    this.swim.play();
  }

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      // console.log(e);
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.08;
    });
  }

  resize() {}

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    this.actualRoom.rotation.y = this.lerp.current;

    this.mixer.update(this.time.delta * 0.001);
  }
}
