import * as THREE from "three";
import GSAP from "gsap";
import Experience from "../Experience";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from "@ashthornton/asscroll";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.room = this.experience.world.room.actualRoom;
    this.room.children.forEach((child) => {
      if (child.type === "RectAreaLight") {
        this.rectLight = child;
      }
    });
    this.circleFirst = this.experience.world.floor.circleFirst;
    this.circleSecond = this.experience.world.floor.circleSecond;
    this.circleThird = this.experience.world.floor.circleThird;

    GSAP.registerPlugin(ScrollTrigger);

    document.querySelector(".page").style.overflow = "visible";

    if (
      !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      this.setASS();
    }
    this.setScrollTrigger();
  }

  setupASScroll() {
    // https://github.com/ashthornton/asscroll
    const asscroll = new ASScroll({
      ease: 0.1,
      disableRaf: true,
    });

    GSAP.ticker.add(asscroll.update);

    ScrollTrigger.defaults({
      scroller: asscroll.containerElement,
    });

    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value) {
        if (arguments.length) {
          asscroll.currentPos = value;
          return;
        }
        return asscroll.currentPos;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      fixedMarkers: true,
    });

    asscroll.on("update", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", asscroll.resize);

    requestAnimationFrame(() => {
      asscroll.enable({
        newScrollElements: document.querySelectorAll(
          ".gsap-marker-start, .gsap-marker-end, [asscroll]"
        ),
      });
    });
    return asscroll;
  }

  setASS() {
    this.asscroll = this.setupASScroll();
  }

  setScrollTrigger() {
    let mm = GSAP.matchMedia();

    //Desktop
    mm.add("(min-width: 969px)", () => {
      console.log("fired Desktop");

      this.rectLight.width = 1.2;
      this.rectLight.height = 1.2;
      this.room.scale.set(0.15, 0.15, 0.15);

      //First-section
      this.firstMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".first-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      this.firstMoveTimeline.to(this.room.position, {
        x: () => {
          return this.sizes.width * 0.0018;
        },
      });

      //Second-section
      this.secondMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".second-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })
        .to(
          this.room.position,
          {
            x: () => {
              return 1;
            },
            z: () => {
              return this.sizes.height * 0.0032;
            },
          },
          "same"
        )
        .to(
          this.room.scale,
          {
            x: 0.54,
            y: 0.54,
            z: 0.54,
          },
          "same"
        )
        .to(
          this.rectLight,
          {
            width: 1.2 * 4.5,
            height: 1.2 * 3,
          },
          "same"
        );

      //Third-section
      this.thirdMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".third-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      }).to(this.camera.orthographicCamera.position, {
        y: -0.5,
        x: -5.75,
      });
    });

    //Mobile
    mm.add("(max-width: 968px)", () => {
      console.log("fired Mobile");

      //Resets
      this.room.scale.set(0.1, 0.1, 0.1);
      this.room.position.set(0, 0, 0);
      this.rectLight.width = 1;
      this.rectLight.height = 0.8;

      //First-section
      this.firstMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".first-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      }).to(this.room.scale, {
        x: 0.14,
        y: 0.14,
        z: 0.14,
      });

      //Second-section
      this.secondMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".second-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })
        .to(
          this.room.scale,
          {
            x: 0.34,
            y: 0.34,
            z: 0.34,
          },
          "same"
        )
        .to(
          this.rectLight,
          {
            width: 3,
            height: 3,
          },
          "same"
        )
        .to(
          this.room.position,
          {
            x: 2,
          },
          "same"
        );

      //Third-section
      this.thirdMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".third-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      }).to(this.camera.orthographicCamera.position, {
        y: 0.5,
        x: -0.5,
      });
    });

    //All
    mm.add("all", () => {
      this.sections = document.querySelectorAll(".section");
      this.sections.forEach((section) => {
        this.progressWrapper = section.querySelector(".progress-wrapper");
        this.progressBar = section.querySelector(".progress-bar");

        if (section.classList.contains("right")) {
          GSAP.to(section, {
            borderTopLeftRadius: 10,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top top",
              scrub: 0.6,
            },
          });
          GSAP.to(section, {
            borderBottomLeftRadius: 700,
            scrollTrigger: {
              trigger: section,
              start: "bottom bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        } else {
          GSAP.to(section, {
            borderTopRightRadius: 10,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top top",
              scrub: 0.6,
            },
          });
          GSAP.to(section, {
            borderBottomRightRadius: 700,
            scrollTrigger: {
              trigger: section,
              start: "bottom bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        }

        GSAP.from(this.progressBar, {
          scaleY: 0,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.4,
            pin: this.progressWrapper,
            pinSpacing: false,
          },
        });
      });

      //Circle Animations

      //First-Circle
      this.firstMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".first-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      }).to(this.circleFirst.scale, {
        x: 3,
        y: 3,
        z: 3,
      });

      //Second-section
      this.secondMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".second-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      })
        .to(
          this.circleSecond.scale,
          {
            x: 3.2,
            y: 3.2,
            z: 3.2,
          },
          "same"
        )
        .to(
          this.room.position,
          {
            y: 0.2,
          },
          "same"
        );

      //Third-section
      this.thirdMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".third-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      })
        .to(
          this.circleThird.scale,
          {
            x: 3.3,
            y: 3.3,
            z: 3.3,
          },
          "same"
        )
        .to(
          this.room.position,
          {
            y: 0.1,
          },
          "same"
        );

      //Mini Platform
      this.secondPartTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".third-move",
          start: "center center",
        },
      });

      this.room.children.forEach((child) => {
        if (child.name === "Mini_Floor") {
          this.first = GSAP.to(child.position, {
            x: -5.44055,
            z: 13.6135,
            duration: 0.3,
          });
        }
        if (child.name === "Mailbox") {
          this.second = GSAP.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2)",
            duration: 0.3,
          });
        }
        if (child.name === "Lamp") {
          this.third = GSAP.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2)",
            duration: 0.3,
          });
        }
        if (child.name === "FloorFirst") {
          this.fourth = GSAP.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2)",
            duration: 0.3,
          });
        }
        if (child.name === "FloorSecond") {
          this.fifth = GSAP.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2)",
            duration: 0.3,
          });
        }
        if (child.name === "FloorThird") {
          this.sixth = GSAP.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2)",
            duration: 0.3,
          });
        }
        if (child.name === "Dirt") {
          this.seventh = GSAP.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2)",
            duration: 0.3,
          });
        }
        if (child.name === "Flower1") {
          this.eighth = GSAP.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2)",
            duration: 0.3,
          });
        }
        if (child.name === "Flower2") {
          this.nineth = GSAP.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2)",
            duration: 0.3,
          });
        }
      });
      this.secondPartTimeline.add(this.first);
      this.secondPartTimeline.add(this.second);
      this.secondPartTimeline.add(this.third);
      this.secondPartTimeline.add(this.fourth, "-=0.2");
      this.secondPartTimeline.add(this.fifth, "-=0.2");
      this.secondPartTimeline.add(this.sixth, "-=0.2");
      this.secondPartTimeline.add(this.seventh, "-=0.2");
      this.secondPartTimeline.add(this.eighth);
      this.secondPartTimeline.add(this.nineth, "-=0.1");
    });
  }
  resize() {}

  update() {}
}
