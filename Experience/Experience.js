import * as THREE from "three";

import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Resources from "./Utils/Resourses";
import assets from "./Utils/assets";

import Theme from "./Theme";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Preloader from "./Preloader";

import World from "./World/World";
import Controls from "./World/Controls";

export default class Experience {
  static instance;
  constructor(canvas) {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.time = new Time();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(assets);
    this.theme = new Theme();
    this.world = new World();
    this.preloader = new Preloader();

    this.preloader.on("enablecontrols", () => {
      this.controls = new Controls();
    });

    this.sizes.on("resize", () => {
      this.resize();
    });
    this.time.on("update", () => {
      this.update();
    }); //Alt + <- to go back to previous window
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
    this.world.resize();
  }

  update() {
    this.camera.update();
    this.world.update();
    this.renderer.update();
    this.preloader.update();
    if (this.controls) {
      this.controls.update();
    }
  }
}
