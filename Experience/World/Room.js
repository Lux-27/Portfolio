import * as THREE from "three";
import Experience from "../Experience";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;

    this.setModel();
    this.setAnimation();
  }

  setModel() {
    this.actualRoom.children.forEach((child) => {
      // child.castShadow = true;
      // child.recieveShadow = true;
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
          // groupChild.castShadow = true;
          // groupChild.recieveShadow = true;
        });
      }

      if (child.name === "Aquarium") {
        child.material = new THREE.MeshPhysicalMaterial();
        child.material.roughness = 0;
        child.material.color.set(0x549dd2);
        child.material.ior = 3;
        child.material.transmission = 1;
        child.material.opacity = 1;
      }

      if (child.name === "Computer") {
        child.children[1].material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        });
      }
    });

    this.scene.add(this.actualRoom);
    this.actualRoom.scale.set(0.15, 0.15, 0.15);
    // this.actualRoom.rotation.y = -Math.PI / 4;
  }

  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.actualRoom);
    this.swim = this.mixer.clipAction(this.room.animations[0]);
    this.swim.play();
  }

  resize() {}

  update() {
    this.mixer.update(this.time.delta * 0.001);
  }
}
